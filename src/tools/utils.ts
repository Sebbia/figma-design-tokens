import { existsSync, mkdirSync } from "fs"
import { Color } from "types"

export function floor(value: number, places: number = 2): number {
    const p = Math.pow(10, places)
    return Math.floor(value * p) / p
}

export function convertColor(color: number): number {
    return Math.round(color * 255)
}

export function normalizeStyleName(name: string): string {
    return name.trim().replace(/\//g, '_').replace(/\s/g, '_').replace(/\_{2,}/g, '_')
}

export function isKeyOfObject<T extends Object>(obj: T, key: any): key is keyof typeof obj {
    return obj.hasOwnProperty(key)
}

export function isArray<T>(obj: any): obj is T[] {
    return Array.isArray(obj)
}

export function isNotNull<T>(value?: T): value is Exclude<T, null> {
    return value !== null && value !== undefined
}

export function convertRGBToHex(r: number, g: number, b: number) {
    let rhex = r.toString(16);
    let ghex = g.toString(16);
    let bhex = b.toString(16);

    if (rhex.length == 1)
        rhex = `0${rhex}`;
    if (ghex.length == 1)
        ghex = `0${ghex}`;
    if (bhex.length == 1)
        bhex = `0${bhex}`;

    return `#${rhex}${ghex}${bhex}`.toUpperCase();
}

export function convertColorToHex(color: Color) {
    return convertRGBToHex(
        convertColor(color.rawColor.r),
        convertColor(color.rawColor.g),
        convertColor(color.rawColor.b)
    )
}

export function ensureDirExists(dir: string) {
    if(!existsSync(dir))
            mkdirSync(dir, { recursive: true })
}

/**
 * Sequential processing async functions
 */
export async function mapAsyncSeq<T, R>(array: T[], block: (value: T) => Promise<R>): Promise<R[]> {
    const result = array.reduce(async (prev, curr, i, r) => {
        const results = await prev;
        const newValue = await block(curr)
        return [...results, newValue]
    }, Promise.resolve<R[]>([]))

    return result
}