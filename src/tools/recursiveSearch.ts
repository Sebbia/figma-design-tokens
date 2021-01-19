import { ensureArray } from "./listTools"

export function findAllRecursive<T>(list: T[], checkWith: (obj: T) => boolean, keepWalking: boolean = false, childFields: string | string[] = "children"): T[] {
    let childKeys = ensureArray(childFields)
    return list.flatMap((obj) => {

        let walkDeeper = (): T[] => {
            return childKeys.flatMap((childKey) => {
                if (Object.keys(obj).includes(childKey) && (obj as any)[childKey] && Array.isArray((obj as any)[childKey])) {
                    return findAllRecursive((obj as any)[childKey] as T[], checkWith, keepWalking, childKey)
                } else {
                    return []
                }
            })
        }

        if (checkWith(obj)) {
            let foundedObject = [obj]
            if (!keepWalking)
                return foundedObject
            else {
                let childResult = walkDeeper()
                return [...childResult, ...foundedObject]
            }
        } else {
            return walkDeeper()
        }
    }).filter(it => it != null).map(it => it as T)
}
