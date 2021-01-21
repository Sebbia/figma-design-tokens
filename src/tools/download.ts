import util from 'util'
import { pipeline } from 'stream'
import fs from 'fs';
import fetch from 'node-fetch'

const streamPipeline = util.promisify(pipeline)

// TODO: Add normal errors
export async function downloadFile(url: string, path: string) {
    const fileResponse = await fetch(url)
    if (!fileResponse.ok) throw new Error(`<96354da5> Unexpected response ${fileResponse.statusText}`)
    streamPipeline(fileResponse.body, fs.createWriteStream(path))
}