export function floor(value: number, places: number = 2): number {
    let p = Math.pow(10, places)
    return Math.floor(value * p) / p
}

export function convertColor(color: number): number {
    return Math.floor(color * 255)
}