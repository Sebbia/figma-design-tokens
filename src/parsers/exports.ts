import fs from 'fs';
import * as Figma from 'figma-js';
import { findAllRecursive } from '../tools/recursiveSearch';
import { downloadFile } from '../tools/download';
import { repeatOnError } from "../tools/repeatOnError";
import { ensureDirExists, normalizeStyleName } from '../tools/utils'
import chalk from 'chalk';
import path from 'path';

export async function parseAssetsTokens(data: Figma.FileResponse, canvasName: string): Promise<Figma.Node[]> {
    const assetsTokensHolders =
        (
            data.document
                .children
                // TODO: Fix types, add type guard for children field
                .find(x => x.name == canvasName) as Figma.Canvas
        ).children.filter(x => x.type != 'TEXT')


    const nodesWithExports = findAllRecursive(assetsTokensHolders, (holder) => {
        if ('exportSettings' in holder && holder.exportSettings) {
            return true
        } else {
            return false
        }
    }, true)

    return nodesWithExports
}

export async function downloadAssets(
    assets: Figma.Node[],
    params: {
        client: Figma.ClientInterface,
        fileId: string,
        assetsFolder: string
    }
): Promise<({name: string, filename: string } | undefined)[]> {
    const exports = assets.flatMap(asset => {
        // TODO: Fix types, add type guard for exportSettings field
        const exportSettings = (asset as Figma.Rectangle).exportSettings
        return exportSettings ? exportSettings?.map(setting => {
            return {
                id: asset.id,
                name: asset.name,
                format: setting.format,
                suffix: setting.suffix,
                constraint: setting.constraint
            }
        }) : []
    })

    console.log(chalk.greenBright(`\nLoad ${exports.length} assets:`))
    const promise = Promise.all(
        exports.map(async exportSetting => {
            let format: Figma.exportFormatOptions;
            switch (exportSetting.format) {
                case 'JPG': format = 'jpg'; break;
                case 'PDF': format = 'pdf'; break;
                case 'PNG': format = 'png'; break;
                case 'SVG': format = 'svg'; break;
            }

            let scale: number | undefined = undefined;
            switch (exportSetting.constraint.type) {
                case 'SCALE': scale = exportSetting.constraint.value
            }

            const groups = exportSetting.name.split('/')
            const filepath = path.join(params.assetsFolder, groups.join('/'))
            ensureDirExists(filepath)

            const filename = `${filepath}/${normalizeStyleName(groups[groups.length-1])}${exportSetting.suffix}.${format}`

            try {
                const response = await repeatOnError(async () => await params.client.fileImages(params.fileId, {
                    ids: [exportSetting.id],
                    format: format,
                    scale: scale!
                }))
                // debug(response.data)
                if (!fs.existsSync(params.assetsFolder))
                    fs.mkdirSync(params.assetsFolder)
                const url = response.data.images[exportSetting.id]
                await downloadFile(url, filename)
                console.log(`✓ Asset ${chalk.bold(`${exportSetting.name} ${exportSetting.suffix} (${exportSetting.format})`)} downloaded into file ${filename} `)
                return {
                    name: exportSetting.name,
                    filename: filename
                }
            } catch (e) {
                console.error(`❌ Asset ${chalk.bold(`${exportSetting.name} ${exportSetting.suffix} (${exportSetting.format})`)} download error`, e)
                return undefined
            }
        })
    )
    return promise
}