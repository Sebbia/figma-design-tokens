import * as Figma from 'figma-js';
import chalk from 'chalk';
import { byKey, byNullableStringParameter, groupBy, unique } from '../tools/listTools';
import { findAllRecursive } from '../tools/recursiveSearch';
import debug from '../tools/debug';
import { convertColor, floor } from '../tools/utils';
import { StyleObj } from 'types';


export async function parseDesignTokens(data: Figma.FileResponse): Promise<StyleObj[]> {
    const designTokensHolders =
        (
            data.document
                .children
                // TODO: Fix types, add type guard for children field
                .find(x => x.name == 'DesignTokens') as Figma.Canvas
        ).children
        // .filter(x => x.type != 'TEXT')

    const designTokensMap = Object.keys(data.styles).flatMap(style => {
        const styleInfo = data.styles[style]

        const nodesWithStyles = findAllRecursive(
            designTokensHolders,
            (holder) => 'styles' in holder && Boolean(holder.styles),
            true
        )

        const stylesMap = nodesWithStyles.flatMap((x) => {
            // TODO: Fix types, add type guard for styles field
            const styles = (x as Figma.Rectangle).styles
            let styleType = null;
            if (styles) {
                for (const [key, value] of Object.entries(styles)) {
                    if (value == style)
                        styleType = key
                }
            }

            switch (styleType?.toLowerCase()) {
                case 'fills':
                case "fill": {
                    return {
                        "styleType": styleInfo.styleType,
                        "styleName": style,
                        "styleObj": styleInfo,
                        // TODO: Add type guard for style field
                        "value": (x as Figma.Rectangle).fills[0]
                    }
                }

                case "text": {
                    return {
                        "styleType": styleInfo.styleType,
                        "styleName": style,
                        "styleObj": styleInfo,
                        // TODO: Add type guard for style field
                        "value": (x as Figma.Text).style
                    }
                }

                case "strokes":
                case "stroke": {
                    const vect = (x as Figma.Vector)
                    return {
                        "styleType": styleInfo.styleType,
                        "styleName": style,
                        "styleObj": styleInfo,
                        "value": {
                            "strokes": vect.strokes,
                            "strokeAlign": vect.strokeAlign,
                            "strokeWeight": vect.strokeWeight
                        }
                    }
                }
                case null:
                case undefined: {
                    return null
                }

                default: {
                    console.log(`<ad32105d> Unknown Style Type: ${styleType} with obj`)
                    debug(x, 1)
                    return null
                }
            }
        }).filter(x => x != null)
        return stylesMap
    }).sort(byKey(item => item?.styleObj.name, byNullableStringParameter))
        .filter(unique(v => v?.styleName)) as StyleObj[]

    return designTokensMap
}

function printFill(name: string, style: Figma.Paint) {
    const c = style.color
    if (c)
        console.log(
            chalk.bold(name),
            "\n",
            chalk.rgb(convertColor(c.r), convertColor(c.g), convertColor(c.b)).underline("██████████████████")
        )
}

function printTextStyle(name: string, style: Figma.TypeStyle) {
    let lineHeight: number;
    let lineHeightUnit: 'px' | '%';
    switch (style.lineHeightUnit) {
        case 'FONT_SIZE_%': {
            lineHeight = style.lineHeightPercentFontSize ? floor(style.lineHeightPercentFontSize) : 100
            lineHeightUnit = '%'
            break;
        };
        case 'PIXELS': {
            lineHeight = floor(style.lineHeightPx)
            lineHeightUnit = 'px'
            break;
        };
        case 'INTRINSIC_%': {
            lineHeight = style.lineHeightPercentFontSize ? floor(style.lineHeightPercentFontSize) : 100
            lineHeightUnit = '%'
            break;
        }
    }
    console.log(
        chalk.bold(name),
        "\n",
        `${style.fontFamily} ${style.fontSize}px \n\tWeight: ${style.fontWeight}; \n\tLine height: ${lineHeight}${lineHeightUnit}`
    )
}

export function printDesignTokens(designTokens: StyleObj[]) {
    console.log(chalk.greenBright(`\nReceive ${designTokens.length} design tokens`))
    groupBy(designTokens, token => token.styleType).forEach((styles, styleType) => {
        switch (styleType) {
            case 'FILL': {
                console.log(chalk.greenBright(`\n ${styles.length} color styles:`))
                styles.map(style => {
                    printFill(style?.styleObj.name, style.value as Figma.Paint)
                })
                break;
            };
            case 'TEXT': {
                console.log(chalk.greenBright(`\n ${styles.length} text styles:`))
                styles.map(style => {
                    printTextStyle(style?.styleObj.name, style.value as Figma.TypeStyle)
                })
                break;
            }
        }
    })
}