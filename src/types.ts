
import { NodeType, VectorBase } from 'figma-js'
import * as Figma from 'figma-js';

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

export { ExtendedNodeType }