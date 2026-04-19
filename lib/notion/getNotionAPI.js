import { NotionAPI as NotionLibrary } from 'notion-client'
import BLOG from '@/blog.config'
import path from 'path'
import { RateLimiter } from './RateLimiter'

const lifecycle = process.env.npm_lifecycle_event
const useRateLimiter =
  lifecycle === 'build' ||
  lifecycle === 'build-all-in-dev' ||
  lifecycle === 'export'
const lockFilePath = path.resolve(process.cwd(), '.notion-api-lock')
const rateLimiter = new RateLimiter({
  minIntervalMs: 350,
  lockFilePath
})
const globalStore = {
  notion: null,
  inflight: new Map()
}

function getRawNotion() {
  if (!globalStore.notion) {
    globalStore.notion = new NotionLibrary({
      apiBaseUrl: BLOG.API_BASE_URL || 'https://www.notion.so/api/v3',
      activeUser: BLOG.NOTION_ACTIVE_USER || null,
      authToken: BLOG.NOTION_TOKEN_V2 || null,
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      kyOptions: {
        mode: 'cors',
        hooks: {
          beforeRequest: [
            request => {
              const url = request.url.toString()
              if (url.includes('/api/v3/syncRecordValues')) {
                return new Request(
                  url.replace(
                    '/api/v3/syncRecordValues',
                    '/api/v3/syncRecordValuesMain'
                  ),
                  request
                )
              }
              return request
            }
          ]
        }
      }
    })
  }
  return globalStore.notion
}

async function callNotion(methodName, ...args) {
  const notion = getRawNotion()
  const original = notion[methodName]
  if (typeof original !== 'function') {
    throw new Error(`${methodName} is not a function`)
  }

  const key = `${methodName}:${JSON.stringify(args)}`
  if (globalStore.inflight.has(key)) {
    return await globalStore.inflight.get(key)
  }

  const execute = () => original.apply(notion, args)
  const promise = useRateLimiter
    ? rateLimiter.enqueue(key, execute)
    : execute()

  globalStore.inflight.set(key, promise)
  promise.finally(() => globalStore.inflight.delete(key))
  return await promise
}

const notionAPI = {
  getPage: (...args) => callNotion('getPage', ...args),
  getBlocks: (...args) => callNotion('getBlocks', ...args),
  getUsers: (...args) => callNotion('getUsers', ...args)
}

export default notionAPI
