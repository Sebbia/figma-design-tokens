import * as Figma from 'figma-js'
import { ExtendedNodeType, StyleObj } from '../types'
import { byKey, byNullableStringParameter } from '../tools/listTools';
import { findAllRecursive } from '../tools/recursiveSearch';
import chalk from 'chalk';
// import debug from '../tools/debug';

export async function parseComponents(data: Figma.FileResponse): Promise<Figma.Node[]> {
    const componentsHolder =
        (
            data.document
                .children
                // TODO: Fix types, add type guard for children field
                .find(x => x.name == 'Components') as Figma.Canvas
        ).children.filter(x => x.type != 'TEXT')

    const components = findAllRecursive(componentsHolder, (token) => {
        if (token.type == 'COMPONENT' || token.type as ExtendedNodeType == 'COMPONENT_SET') {
            return true
        } else {
            return false
        }
    }, false).sort(byKey(item => item.name, byNullableStringParameter))

    return components
}

export async function printComponents(components: Figma.Node[], styles: StyleObj[]) {
    console.log(chalk.greenBright(`\nReceive ${components.length} components:`))
    // debug(components.find(it => it.name == 'button'))
    console.table(components.map(x => {
        // TODO: Fix types, add type guard for children field
        const subComponents = findAllRecursive(
            (x as Figma.Component).children as Figma.Component[],
            token => token.type == 'COMPONENT' || token.type as ExtendedNodeType == 'COMPONENT_SET',
            true
        )
        return {
            name: x.name,
            subComponents: subComponents.length > 0 ? subComponents.reduce((p, v, i) => `${v.name}${p ? ', ' + p : ''}`, '') : null,
            styles: (x as Figma.Rectangle).styles || null
        }
    }))
}