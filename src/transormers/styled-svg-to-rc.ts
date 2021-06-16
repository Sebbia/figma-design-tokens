import camelcase from "camelcase";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { unique } from "../tools/listTools";
import { html } from 'common-tags';
import chalk from "chalk";
import { ensureDirExists } from "../tools/utils";

const variableRegex = /--(?<variable>[\w-]+),?/gmi;

export function parseVariables(content: string): string[] {

    const matches = content.matchAll(variableRegex)

    let variables = []
    for (let match of matches) {
        const variable = match.groups?.variable
        if (variable)
            variables.push(variable)
    }
    return variables.filter(unique(it => it))
}

export function makeStyledComponentFromSvg(content: string, filename: string, outdir: string): string {

    console.log(
        'Make new styled component from SVG file: ',
        chalk.bold(filename),
        ` into ${outdir}`
    )

    const variables = parseVariables(content)
    const componentProps = variables.map(variable => { return { name: camelcase(variable), variable: variable } })
    const componentName = camelcase(filename.split('.')[0], { pascalCase: true })

    const componentPropsTypeName = `${componentName}Props`

    const componentPropsType = html`
    function propsToCssVars(props?: ${componentPropsTypeName}): React.CSSProperties {
        return {
            ${componentProps.map(prop => `'--${prop.variable}': props?.styles?.${prop.name},`)}
        } as React.CSSProperties
    }

    export type ${componentPropsTypeName} = {
        styles?: {
            ${componentProps.map(prop => `${prop.name}?: string`)}
        }
    }
    `

    const componentContent = html`
        import React from 'react';
        import { ReactComponent as ${componentName}Svg } from './${filename}';

        ${componentProps.length > 0 ? componentPropsType : ''}

        /**
         * Generated component
         * Available CSS variables: ${variables.join(', ')}
         **/
        export default function ${componentName}(${componentProps.length > 0 ? `props?: ${componentPropsTypeName}` : ''}) {
            return <${componentName}Svg ${componentProps.length > 0 ? `style={{ ...propsToCssVars(props) }}` : ''}/>
        }
    `

    return componentContent
}

export function makeStyledComponentFromSvgFile(filepath: string, outdir: string): Component {
    const filename = path.basename(filepath)
    const fileContent = readFileSync(filepath).toString()
    const componentContent = makeStyledComponentFromSvg(fileContent, filename, outdir)
    const componentName = camelcase(filename.split('.')[0], { pascalCase: true })

    const componentPath = path.join(outdir, componentName)

    ensureDirExists(componentPath)

    copyFileSync(filepath, path.join(componentPath, filename))

    writeFileSync(path.join(componentPath, `${componentName}.tsx`), componentContent)
    return { componentName, path: componentPath }
}

export type Component = {
    componentName: string,
    path: string
}

export function makeIndexFile(components: Component[], outdir: string): string {
    return html`
    ${components.map((component) => {
        return `import ${component.componentName} from './${component.componentName}/${component.componentName}'`
    })}

    export {
        ${components.map((component) => {
            return `${component.componentName},`
        })}
    }
    `
}

export function createIndexFile(components: Component[], outdir: string) {
    const indexFile = makeIndexFile(components, outdir)
    writeFileSync(path.join(outdir, `index.tsx`), indexFile)
}