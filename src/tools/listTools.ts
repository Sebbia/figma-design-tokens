
type FilterComparator<T> = (element: T, index: number, array: T[]) => boolean

export function unique<T, R>(uniqueBy: (value: T) => R): FilterComparator<T> {
    const comparator = (element: T, index: number, array: T[]): boolean => {
        return array.findIndex((value) => uniqueBy(value) == uniqueBy(element)) == index
    }

    return comparator
}

type SortComparator<T> = (a: T, b: T) => number
type FieldGetter<T, R> = (item: T) => R

export function byKey<T, R>(fieldGetter: FieldGetter<T, R>, comparator: SortComparator<R>): SortComparator<T> {
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

export function groupBy<T, R>(list: T[], fieldGetter: FieldGetter<T, R>): Map<R,T[]> {
    return list.reduce((previous, current) => {
        const key = fieldGetter(current)
        if(previous.has(key)){
            const existed = previous.get(key)!!
            previous.set(key, existed?.concat([current]))
        } else {
            previous.set(key, [current])
        }
        return previous
    }, new Map<R,T[]>())
}