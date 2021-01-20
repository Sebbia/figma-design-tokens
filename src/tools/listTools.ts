
type FilterComparator<T> = (element: T, index: number, array: T[]) => boolean

export function unique<T, R>(uniqueBy: (value: T) => R): FilterComparator<T> {
    const comparator = (element: T, index: number, array: T[]): boolean => {
        return array.findIndex((value) => uniqueBy(value) == uniqueBy(element)) == index
    }

    return comparator
}

type SortComparator<T> = (a: T, b: T) => number

export function byKey<T, R>(fieldGetter: (item: T) => R, comparator: SortComparator<R>): SortComparator<T> {
    return function (a: T, b: T): number {
        return comparator(fieldGetter(a), fieldGetter(b))
    }
}

export function byStringParameter(a: string, b: string): number {
    return a.toLowerCase().localeCompare(b.toLowerCase())
}

export function byNullableStringParameter(a?: string, b?: string): number {
    if (a != undefined && b != undefined) {
        return a.toLowerCase().localeCompare(b.toLowerCase())
    }
    return 0
}

export function ensureArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value]
}