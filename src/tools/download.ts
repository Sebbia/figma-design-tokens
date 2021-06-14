import util from 'util'
import { pipeline } from 'stream'
import fs from 'fs';
import fetch from 'node-fetch'
import AbortController from 'abort-controller';
import https from 'https'

const streamPipeline = util.promisify(pipeline)

const agent = new https.Agent({
    keepAlive: false,
    keepAliveMsecs: 1500,
    maxSockets: 10
});

// TODO: Add normal errors
export async function downloadFile(url: string, path: string) {
    
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 1_000);
    
    let fileResponse
    try {
        fileResponse = await fetch(url, {
            signal: controller.signal,
            agent: agent
        })
    } finally {
        clearTimeout(timeout);
    }
    if (!fileResponse.ok) throw new Error(`<96354da5> Unexpected response ${fileResponse.statusText}`)
    streamPipeline(fileResponse.body, fs.createWriteStream(path))
}