import util from 'util'

export default function debug(obj: any, depth: number = 10): void {
    console.debug(util.inspect(obj, { colors: true, depth: depth }))
}
