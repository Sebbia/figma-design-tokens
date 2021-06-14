
import { convertColorToHex } from "../tools/utils";
import { Color } from "../types";
import { css } from "../css-render/modules";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

export function replaceColorsToVariables(content: string, colors: Color[]): string {
    let newContent = colors.reduce((prev, curr, arr) => {
        const hexColor = convertColorToHex(curr).toUpperCase()
        const regexp = new RegExp(`${hexColor}`, 'igm');
        const cssValue = css.useVar(
            curr.name,
            curr.isThemeColor ? css.useVar(curr.name.concat("-override"), curr.value) : curr.value
        ).render()
        return prev.replace(regexp, cssValue)
    }, content)

    return newContent
}

export function replaceSvgColors(filename: string, colors: Color[], outdir: string): string {
    const fileContent = readFileSync(filename).toString()
    const newContent = replaceColorsToVariables(fileContent, colors)
    const newFileName = path.basename(filename).split('.').slice(0, -1).join('.').concat('.styled.svg')
    const newFilepath = path.join(outdir, newFileName)
    writeFileSync(newFilepath, newContent)
    return newFilepath
}