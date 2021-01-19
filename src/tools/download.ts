import util from 'util'
import { pipeline } from 'stream'
import fs from 'fs';
import fetch from 'node-fetch'

const streamPipeline = util.promisify(pipeline)

// TODO: Add normal errors
export async function downloadFile(url: string, path: string) {
    let fileResponse = await fetch(url)
    if (!fileResponse.ok) throw new Error(`<96354da5> Unexpected response ${fileResponse.statusText}`)
    streamPipeline(fileResponse.body, fs.createWriteStream(path))
}

export function normalizeFileName(name: string): string {
    return name.replace('/', '_').replace(' ', '_')
}