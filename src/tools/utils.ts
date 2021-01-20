export function floor(value: number, places: number = 2): number {
    const p = Math.pow(10, places)
    return Math.floor(value * p) / p
}

export function convertColor(color: number): number {
    return Math.floor(color * 255)
}

export function normalizeStyleName(name: string): string {
    return name.replace(/\//g, '_').replace(/\s/g, '_').replace(/\_{2,}/g, '_')
}

export function isKeyOfObject<T extends Object>(obj: T, key: any): key is keyof typeof obj {
    return obj.hasOwnProperty(key)
}

export function isArray<T>(obj: any): obj is Array<T> {
    return Array.isArray(obj)
}