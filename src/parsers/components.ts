import * as Figma from 'figma-js'
import { ExtendedNodeType } from '../types'
import { byKey, byNullableStringParameter } from '../tools/listTools';
import { findAllRecursive } from '../tools/recursiveSearch';

export async function parseComponents(data: Figma.FileResponse): Promise<Figma.Node[]> {
    let componentsHolder =
        (
            data.document
                .children
                // TODO: Fix types, add type guard for children field
                .find(x => x.name == 'Components') as Figma.Canvas
        ).children.filter(x => x.type != 'TEXT')

    let components = findAllRecursive(componentsHolder, (token) => {
        if (token.type == 'COMPONENT' || token.type as ExtendedNodeType == 'COMPONENT_SET') {
            return true
        } else {
            return false
        }
    }, false).sort(byKey(item => item.name, byNullableStringParameter))

    return components
}

export async function printComponents(components: Figma.Node[]) {
    // debug(components)
    console.table(components.map(x => {
        // TODO: Fix types, add type guard for children field
        let subComponents = findAllRecursive((x as Figma.Component).children as Figma.Component[], (token) => {
            if (token.type == 'COMPONENT' || token.type as ExtendedNodeType == 'COMPONENT_SET') {
                return true
            } else {
                return false
            }
        }, true)
        return {
            name: x.name,
            subComponents: subComponents.length > 0 ? subComponents.reduce((p, v, i) => `${v.name}${p ? ', ' + p : ''}`, '') : null
        }
    }))
}