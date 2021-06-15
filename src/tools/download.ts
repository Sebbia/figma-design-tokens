import util from 'util'
import { pipeline } from 'stream'
import fs from 'fs';
import fetch from 'node-fetch'
import https from 'https'

const streamPipeline = util.promisify(pipeline)

const agent = new https.Agent({
    keepAlive: false,
    keepAliveMsecs: 1500,
    maxSockets: 10
});

// TODO: Add normal errors
export async function downloadFile(url: string, path: string, timeout?: number) {
    const fileResponse = await fetch(url, {
        agent: agent
    })
    if (!fileResponse.ok) throw new Error(`<96354da5> Unexpected response ${fileResponse.statusText}`)
    streamPipeline(fileResponse.body, fs.createWriteStream(path))
}