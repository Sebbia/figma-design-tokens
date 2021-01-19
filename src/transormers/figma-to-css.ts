import * as Figma from 'figma-js';
import { css, CssModule } from "../css-render/modules";
import { StyleObj } from "types";
import { convertColor, floor, normalizeStyleName } from '../tools/utils';
import debug from '../tools/debug';

export function colorsToCss(designTokens: StyleObj[]): CssModule {
    let colorVars = designTokens.filter(token => token.styleType == "FILL").flatMap(token => {
        let styles = []
        let style = token.value as Figma.Paint
        // debug(style)
        if (style.color) {
            let rgbaColor = css.fun("rgba", [
                convertColor(style.color.r),
                convertColor(style.color.g),
                convertColor(style.color.b),
                style.opacity ? floor(style.opacity, 2) : 1
            ])
            let variableName = normalizeStyleName(token.styleObj.name)
            let isThemeColor = token.styleObj.name.split('/').map(i => i.toLocaleLowerCase().trim()).includes('theme')
            styles.push(
                css.declareVar(
                    variableName,
                    isThemeColor ? css.useVar(variableName.concat("-override"), rgbaColor) : rgbaColor
                )
            )
        }
        return styles
    })
    return css.useBlock(":root", colorVars)
}

export function textStylesToCss(designTokens: StyleObj[]): CssModule[] {
    let textClasses = designTokens.filter(token => token.styleType == 'TEXT').flatMap(token => {
        let style = token.value as Figma.TypeStyle
        let className = normalizeStyleName(token.styleObj.name)
        debug(style)

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
        let lineHeightValue = `${lineHeight}${lineHeightUnit}`

        let properties = [
            css.property('font-family', style.fontPostScriptName),
            css.property('font-weight', style.fontWeight),
            css.property('font-size', style.fontSize),
            css.property('line-height', lineHeightValue),
        ]

        let styleClass = css.useClass(className, properties)
        return styleClass
    })
    return textClasses
}