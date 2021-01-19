import * as yargs from "yargs";
import { exit } from "yargs";

import * as Figma from 'figma-js';
import { parseDesignTokens, printDesignTokens } from './parsers/design-tokens';
import { parseComponents, printComponents } from './parsers/components';
import { downloadAssets, parseAssetsTokens } from './parsers/exports';
import chalk from "chalk";


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
    .option("c", {
        alias: "config-file",
        describe: "JSON configuration file",
        nargs: 1,
        type: "string",
        default: "./.figmarc.json",
    })
    .demandCommand();

const argv = cmdLineParser.argv;

// TODO: Parse configuration file and merge parameters here

const assetsFolder = argv.path as string;
const fileId = argv.f as string;
const apiToken = argv.t as string;

async function main() {
    const client = Figma.Client({
        personalAccessToken: apiToken
    })

    let fileResponse = await client.file(fileId)
    if(fileResponse.status == 200){
        let components = await parseComponents(fileResponse.data)
        printComponents(components)
    
        let designTokens = await parseDesignTokens(fileResponse.data)
        printDesignTokens(designTokens)
    
        let assets = await parseAssetsTokens(fileResponse.data)
    
        downloadAssets(
            assets,
            {
                client: client,
                assetsFolder: assetsFolder,
                fileId: fileId
            }
        )
    } else {
        let message = chalk.red(`<ca092e5b> Can't retrieve file from Figma`)
        exit(1, Error(message))
    }
}

main()