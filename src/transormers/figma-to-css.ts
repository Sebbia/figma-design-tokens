import * as Figma from 'figma-js';
import { css, CssModule } from "../css-render/modules";
import { StyleObj } from "types";
import { convertColor, floor, normalizeStyleName } from '../tools/utils';
// import debug from '../tools/debug';

export function colorsToCss(designTokens: StyleObj[]): CssModule {
    const colorVars = designTokens.filter(token => token.styleType == "FILL").flatMap(token => {
        const styles = []
        const style = token.value as Figma.Paint
        // debug(style)
        if (style.color) {
            const rgbaColor = css.fun("rgba", [
                convertColor(style.color.r),
                convertColor(style.color.g),
                convertColor(style.color.b),
                style.opacity ? floor(style.opacity, 2) : 1
            ])
            const variableName = normalizeStyleName(token.styleObj.name)
            const isThemeColor = token.styleObj.name.split('/').map(i => i.toLocaleLowerCase().trim()).includes('theme')
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
    const textClasses = designTokens.filter(token => token.styleType == 'TEXT').flatMap(token => {
        const style = token.value as Figma.TypeStyle
        const className = normalizeStyleName(token.styleObj.name)
        // debug(style)

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
        const lineHeightValue = `${lineHeight}${lineHeightUnit}`

        let textAllign: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end' = 'left'
        switch (style.textAlignHorizontal) {
            case 'LEFT': textAllign = 'left'; break;
            case 'RIGHT': textAllign = 'right'; break;
            case 'CENTER': textAllign = 'center'; break;
            case 'JUSTIFIED': textAllign = 'justify'; break;
        }

        let allignItems: 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' = 'normal'
        switch (style.textAlignVertical) {
            case 'BOTTOM': allignItems = 'end'; break;
            case 'CENTER': allignItems = 'center'; break;
            case 'TOP': allignItems = 'start'; break;
        }

        let letterSpacing = style.letterSpacing == 0 ? 'normal' : `${floor(style.letterSpacing)}px`

        const properties = [
            css.property('font-family', style.fontPostScriptName),
            css.property('font-weight', style.fontWeight),
            css.property('font-size', style.fontSize),
            css.property('line-height', lineHeightValue),
            css.property('letter-spacing', letterSpacing),
            css.property('text-align', textAllign),
            css.property('align-items', allignItems)
        ]

        const styleClass = css.useClass(className, properties)
        return styleClass
    })
    return textClasses
}