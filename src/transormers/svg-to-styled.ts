
import { convertColor, convertRGBToHex } from "../tools/utils";
import { Color } from "../types";
import { css } from "../css-render/modules";
import { readFile, writeFile } from "fs/promises";
import path from "path";

function* combineColors(rawColor: { r: number, g: number, b: number }) {
    function generateSimilarValues(val: number): number[] {
        return [val, val + 1, val - 1]
    }

    const similarColorArray = {
        r: generateSimilarValues(rawColor.r),
        g: generateSimilarValues(rawColor.g),
        b: generateSimilarValues(rawColor.b)
    }

    for (let r = 0; r <= 2; r++) {
        for (let g = 0; g <= 2; g++) {
            for (let b = 0; b <= 2; b++) {
                yield {
                    r: similarColorArray.r[r],
                    g: similarColorArray.g[g],
                    b: similarColorArray.b[b]
                }
            }
        }
    }
}

export function replaceColorsToVariables(content: string, colors: Color[]): string {
    let newContent = colors.reduce((prev, currColor, arr) => {
        const rawColor = currColor.rawColor
        const similarColors = [
            ...combineColors({
                r: convertColor(rawColor.r),
                g: convertColor(rawColor.g),
                b: convertColor(rawColor.b)
            })
        ]
        const hexColors = similarColors.map(color => convertRGBToHex(color.r, color.g, color.b).toUpperCase())

        const cssValue = css.useVar(
            currColor.name,
            currColor.isThemeColor ? css.useVar(currColor.name.concat("-override"), currColor.value) : currColor.value
        ).render()

        return hexColors.reduce((prev, hexColor, arr) => {
            const regexp = new RegExp(`${hexColor}`, 'igm');
            return prev.replace(regexp, cssValue)
        }, prev)
    }, content)

    return newContent
}

export async function replaceSvgColors(filename: string, colors: Color[], outdir: string): Promise<string> {
    const fileContent = await readFile(filename, 'utf-8')
    const newContent = replaceColorsToVariables(fileContent, colors)
    const newFileName = path.basename(filename).split('.').slice(0, -1).join('.').concat('.styled.svg')
    const newFilepath = path.join(outdir, newFileName)
    await writeFile(newFilepath, newContent)
    return newFilepath
}