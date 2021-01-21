import { groupBy, unique } from './tools/listTools'

const objs = [
    { "id": "unique <9f1f26e3>" },
    { "id": "unique <d10a59f1>" },
    { "id": "unique <3928d0e0>" },
    { "id": "unique <ad6748a>" },
    { "id": "unique <cfe8850>" },
    { "id": "<9f1f26e3>" },
    { "id": "<9f1f26e3>" },
    { "id": "<9f1f26e3>" },
    { "id": "<9f1f26e3>" }
]
test("Test unique object comparator", () => {
    const uniqueObjs = objs.filter(unique(value => value.id))
    expect(uniqueObjs.length).toEqual(6);
});

test("Test grouping list", () => {
    const uniqueObjs = groupBy(objs, value => value.id)
    expect(uniqueObjs.size).toEqual(6);
    expect(uniqueObjs.get("<9f1f26e3>")?.length).toEqual(4);
});