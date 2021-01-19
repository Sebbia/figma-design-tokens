import { ensureArray } from "../tools/listTools";
import BaseRenderComponent from "./BaseRenderComponent";

function indent(value: string, indentation: number = 4): string {
    return value.split('\n').map(line =>
        " ".repeat(indentation).concat(line)
    ).join("\n")
}

export abstract class CssModule implements BaseRenderComponent {
    abstract readonly selectors: string[];
    childrens: BaseRenderComponent[] = [];
    render = (): string => {
        return `${this.selectors.join(' ')} {\n${indent(this.childrens?.map(c => c.render()).join('\n'))}\n}`
    };
}

export class CssBlock extends CssModule {
    selectors: string[];
    childrens: BaseRenderComponent[];
    constructor(selectors: string[], childrens: BaseRenderComponent[]) {
        super()
        this.selectors = selectors
        this.childrens = childrens
    };
}

export class CssClass extends CssModule {
    readonly name: string;

    public get selectors(): string[] {
        return [`.${this.name}`]
    };

    childrens: BaseRenderComponent[] = [];

    constructor(name: string, childrens: BaseRenderComponent[] = []) {
        super()
        this.name = name
        this.childrens = childrens
    };
}

export type BaseTypes = string | number | boolean
export type RenderedItem = BaseRenderComponent | BaseTypes

function isRenderComponent(value: any): value is BaseRenderComponent {
    return value.render && typeof value.render == "function";
};

function itemToString(value: RenderedItem): string {
    if (isRenderComponent(value)) {
        return value.render()
    } else {
        return new String(value).toString()
    }
}

export class CssProperty implements BaseRenderComponent {
    readonly name: string;
    value: RenderedItem;

    constructor(name: string, value: RenderedItem) {
        this.name = name
        this.value = value
    }

    render = () => {
        return `${this.name}: ${itemToString(this.value)};`
    }
}

export class CssVariableSpecification implements BaseRenderComponent {
    readonly name: string;
    readonly value: RenderedItem

    constructor(name: string, value: RenderedItem) {
        this.name = name
        this.value = value
    }

    render = () => {
        return `--${this.name}: ${itemToString(this.value)};`
    }
}

export class CssVariableImpl implements BaseRenderComponent {
    readonly name: string;
    readonly default?: RenderedItem

    constructor(name: string, defaultValue?: RenderedItem) {
        this.name = name
        this.default = defaultValue
    }

    render(): string {
        return `var(--${this.name}${this.default ? ', ' + itemToString(this.default) : ''})`
    }
}

export namespace css {
    export function useBlock(
        selectors: string[],
        childrens: BaseRenderComponent[] | BaseRenderComponent
    ): CssBlock {
        return new CssBlock(ensureArray(selectors), ensureArray(childrens))
    }

    export function useClass(
        name: string,
        childrens: BaseRenderComponent[] | BaseRenderComponent
    ): CssClass {
        return new CssClass(name, ensureArray(childrens))
    }

    export function property(
        name: string,
        value: RenderedItem
    ): CssProperty {
        return new CssProperty(name, value)
    }

    export function declareVar(
        name: string,
        value: RenderedItem
    ): CssVariableSpecification {
        return new CssVariableSpecification(name, value)
    }

    export function useVar(
        name: string,
        defaultValue?: RenderedItem
    ): CssVariableImpl {
        return new CssVariableImpl(name, defaultValue)
    }
}
