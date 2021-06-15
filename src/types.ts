
import { NodeType, VectorBase, Color as FigmaColor } from 'figma-js'
import * as Figma from 'figma-js';
import { CssVariableImpl } from 'css-render/modules';

export interface StrokeStyle {
    strokes: Figma.Paint[],
    strokeAlign: VectorBase['strokeAlign']
    strokeWeight: number
}

export interface StyleObj {
    styleType: Figma.StyleType
    styleName: string
    styleObj: Figma.Style
    value: Figma.Paint | Figma.TypeStyle | StrokeStyle
}

type ExtendedNodeType =  NodeType & 'COMPONENT_SET'

export interface Color {
    name: string,
    value: CssVariableImpl,
    rawColor: FigmaColor
    isThemeColor: boolean
}

export { ExtendedNodeType }