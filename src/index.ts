import * as yargs from "yargs";
import { exit } from "yargs";

import * as Figma from 'figma-js';
import { parseDesignTokens, printDesignTokens } from './parsers/design-tokens';
import { parseComponents, printComponents } from './parsers/components';
import { downloadAssets, parseAssetsTokens } from './parsers/exports';
import { colorsToCss, parseColors, textStylesToCss } from './transormers/figma-to-css'
import chalk from "chalk";
import { writeFileSync } from "fs";
import { replaceSvgColors } from "./transormers/svg-to-styled";
import path from "path";
import { ensureDirExists } from "./tools/utils";
import { createIndexFile, makeStyledComponentFromSvgFile } from "./transormers/styled-svg-to-rc";
import { repeatOnError } from "./tools/repeatOnError";


const cmdLineParser = yargs
    .scriptName("figma-design-tokens")
    .command("get", "Retrive tokens from Figma")
    .option("f", {
        alias: "file-id",
        describe: "Figma file id",
        nargs: 1,
        type: "string",
    })
    .option("p", {
        alias: "path",
        describe: "Path to export results",
        nargs: 1,
        default: "./assets",
        type: "string",
    })
    .option("t", {
        alias: "token",
        describe: "Figma api token",
        nargs: 1,
        type: "string",
    })
    .option("n", {
        alias: "name",
        describe: "Figma design canvas name to parse",
        nargs: 1,
        default: "DesignTokens",
        type: "string",
    })
    .option("c", {
        alias: "config-file",
        describe: "JSON configuration file",
        nargs: 1,
        type: "string",
        default: "./.figmarc.json",
    })
    .option("s", {
        alias: "theme-prefix",
        describe: "Theme prefix for CSS color variables",
        nargs: 1,
        type: "string",
        default: "theme",
    })
    .demandCommand();

const argv = cmdLineParser.argv;

// TODO: Parse configuration file and merge parameters here

const outDir = argv.path as string;
const fileId = argv.f as string;
const apiToken = argv.t as string;
const canvasName = argv.n as string;
const themePrefix = argv['theme-prefix'] as string;

ensureDirExists(outDir)

async function main() {
    const client = Figma.Client({
        personalAccessToken: apiToken
    })

    const fileResponse = await repeatOnError(async () => await client.file(fileId))
    if (fileResponse.status == 200) {
        const designTokens = await parseDesignTokens(fileResponse.data, canvasName)
        printDesignTokens(designTokens)

        const components = await parseComponents(fileResponse.data, canvasName)
        printComponents(components, designTokens)

        const stylesFolder = path.join(outDir, "styles")
        ensureDirExists(stylesFolder)

        console.log("\n", chalk.greenBright("Produced CSS"))

        const colorStylesFileName = "colors.css"
        console.log("\n", chalk.greenBright(chalk.bold(colorStylesFileName)))
        const colorsCss = colorsToCss(designTokens, themePrefix).render()
        console.log(chalk.bold(colorsCss))
        writeFileSync(stylesFolder.concat("/".concat(colorStylesFileName)), colorsCss)

        const textStylesFileName = "text.css"
        console.log("\n", chalk.greenBright(chalk.bold(textStylesFileName)))
        const textCss = textStylesToCss(designTokens).map(style => style.render()).join("\n")
        console.log(chalk.bold(textCss))

        writeFileSync(stylesFolder.concat("/".concat(textStylesFileName)), textCss)

        const assets = await parseAssetsTokens(fileResponse.data, canvasName)

        const assetsDir = path.join(outDir, 'assets')
        ensureDirExists(assetsDir)

        const storedAssets = await downloadAssets(assets, {
            client: client,
            assetsFolder: assetsDir,
            fileId: fileId
        })

        const colors = parseColors(designTokens, themePrefix)

        const styledImagesFolder = path.join(outDir, 'styledImages')
        ensureDirExists(styledImagesFolder)

        const componentsFolder = path.join(outDir, 'components')
        ensureDirExists(componentsFolder)

        const reactComponents = await Promise.all(
            storedAssets
                .filter(asset => asset?.filename?.includes('.svg') == true)
                .map(async asset => {
                    const styledSvg = await replaceSvgColors(asset?.name!, asset?.filename!, colors, styledImagesFolder)
                    return makeStyledComponentFromSvgFile(asset?.name!, styledSvg, componentsFolder)
                })
        )
        createIndexFile(reactComponents, componentsFolder)
    } else {
        const message = chalk.red(`<ca092e5b> Can't retrieve file from Figma`)
        exit(1, Error(message))
    }
}

main()