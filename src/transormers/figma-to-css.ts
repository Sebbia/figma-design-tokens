import * as Figma from 'figma-js';
import { css, CssModule } from "../css-render/modules";
import { Color, StyleObj } from "types";
import { convertColor, floor, normalizeStyleName } from '../tools/utils';
import { unique } from '../tools/listTools';
// import debug from '../tools/debug';

export function parseColors(designTokens: StyleObj[], themePrefix: string): Color[] {
    const colors: Color[] = designTokens.filter(token => token.styleType == "FILL").flatMap(token => {
        const styles = []
        const style = token.value as Figma.Paint

        function styleFromColor(color: Figma.Color) {
            const rgbaColor = css.fun("rgba", [
                convertColor(color.r),
                convertColor(color.g),
                convertColor(color.b),
                style.opacity ? floor(style.opacity, 2) : 1
            ])
            const variableName = normalizeStyleName(token.styleObj.name)
            const isThemeColor = token.styleObj.name.split('/').map(i => i.toLocaleLowerCase().trim()).includes(themePrefix)

            return {
                name: variableName,
                value: rgbaColor,
                rawColor: color,
                isThemeColor
            }
        }
        // debug(style)
        if (style.color) {
            styles.push(styleFromColor(style.color))
        }
        if ((style as any).strokes != undefined) {
            ((style as any).strokes as Figma.Paint[]).forEach(stroke => {
                const color = stroke.color!
                styles.push(styleFromColor(color))
            })
        }
        return styles
    }).filter(unique(color => color.name))
    return colors
}

export function colorsToCss(designTokens: StyleObj[], themePrefix: string): CssModule {
    const colorVars = parseColors(designTokens, themePrefix).map(color => {
        // debug(style)
        const variableName = color.name
        return css.declareVar(
            variableName,
            color.isThemeColor ? css.useVar(variableName.concat("-override"), color.value) : color.value
        )
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