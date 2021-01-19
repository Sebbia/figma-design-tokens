import fs from 'fs';
import * as Figma from 'figma-js';
import { findAllRecursive } from '../tools/recursiveSearch';
import { downloadFile, normalizeFileName } from '../tools/download';
import chalk from 'chalk';

export async function parseAssetsTokens(data: Figma.FileResponse): Promise<Figma.Node[]> {
    let assetsTokensHolders =
        (
            data.document
                .children
                // TODO: Fix types, add type guard for children field
                .find(x => x.name == 'DesignTokens') as Figma.Canvas
        ).children.filter(x => x.type != 'TEXT')


    let nodesWithExports = findAllRecursive(assetsTokensHolders, (holder) => {
        if ('exportSettings' in holder && holder.exportSettings) {
            return true
        } else {
            return false
        }
    }, true)

    // debug(nodesWithExports)

    return nodesWithExports
}

export async function downloadAssets(
    assets: Figma.Node[],
    params: {
        client: Figma.ClientInterface,
        fileId: string,
        assetsFolder: string
    }
) {
    let exports = assets.flatMap(asset => {
        // TODO: Fix types, add type guard for exportSettings field
        let exportSettings = (asset as Figma.Rectangle).exportSettings
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

    exports.forEach(async exportSetting => {
        let format: Figma.exportFormatOptions;
        switch (exportSetting.format) {
            case 'JPG': format = 'jpg'; break;
            case 'PDF': format = 'pdf'; break;
            case 'PNG': format = 'png'; break;
            case 'SVG': format = 'svg'; break;
        }

        let scale = undefined;
        switch (exportSetting.constraint.type) {
            case 'SCALE': scale = exportSetting.constraint.value
        }

        let filename = `${params.assetsFolder}/${normalizeFileName(exportSetting.name)}${exportSetting.suffix}.${format}`

        try {
            let response = await params.client.fileImages(params.fileId, {
                ids: [exportSetting.id],
                format: format,
                scale: scale
            })
            // debug(response.data)
            if (!fs.existsSync(params.assetsFolder))
                fs.mkdirSync(params.assetsFolder)
            let url = response.data.images[exportSetting.id]
            await downloadFile(url, filename)
            console.log(`✓ Asset ${chalk.bold(`${exportSetting.name} ${exportSetting.suffix} (${exportSetting.format})`)} downloaded into file ${filename} `)
        } catch(e) {
            console.error(`❌ Asset ${chalk.bold(`${exportSetting.name} ${exportSetting.suffix} (${exportSetting.format})`)} download error`, e)
        }
    })
}