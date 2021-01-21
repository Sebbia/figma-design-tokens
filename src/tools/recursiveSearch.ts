import { ensureArray } from "./listTools"
import { isArray, isKeyOfObject } from "./utils"

export function findAllRecursive<T extends Object>(list: readonly T[], checkWith: (obj: T) => boolean, keepWalking: boolean = false, childFields: string | string[] = "children"): T[] {
    const childKeys = ensureArray(childFields)
    return list.flatMap((obj) => {

        const walkDeeper = (): T[] => {
            return childKeys.flatMap((childKey) => {
                if (isKeyOfObject(obj, childKey) && obj[childKey] && isArray(obj[childKey])) {
                    return findAllRecursive((obj as any)[childKey], checkWith, keepWalking, childKey)
                } else {
                    return []
                }
            })
        }

        if (checkWith(obj)) {
            const foundedObject = [obj]
            if (!keepWalking)
                return foundedObject
            else {
                const childResult = walkDeeper()
                return [...childResult, ...foundedObject]
            }
        } else {
            return walkDeeper()
        }
    }).filter(it => it != null).map(it => it as T)
}
