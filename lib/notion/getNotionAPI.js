import { NotionAPI as NotionLibrary } from 'notion-client'
import BLOG from '@/blog.config'
import { normalizeNotionResponse } from './normalizeNotionRecordMap.mjs'

class CompatibleNotionAPI extends NotionLibrary {
  async fetch(options) {
    // Keep the record format expected by our existing renderer and metadata code.
    return normalizeNotionResponse(await super.fetch(options))
  }
}

const notionAPI = getNotionAPI()

function getNotionAPI() {
  return new CompatibleNotionAPI({
    apiBaseUrl: 'https://app.notion.com/api/v3',
    activeUser: BLOG.NOTION_ACTIVE_USER || null,
    authToken: BLOG.NOTION_TOKEN_V2 || null,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ofetchOptions: {
      timeout: 15000,
      headers: {
        'User-Agent': 'NotionNext (+https://github.com/wangrui6/NotionNext)'
      }
    }
  })
}

export default notionAPI
