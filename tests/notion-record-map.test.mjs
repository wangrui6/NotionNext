import assert from 'node:assert/strict'
import test from 'node:test'
import {
  normalizeNotionRecordMap,
  normalizeNotionResponse
} from '../lib/notion/normalizeNotionRecordMap.mjs'

const wrap = value => ({
  spaceId: 'space-id',
  value: { value, role: 'reader' }
})

test('page responses expose database, view, and article records to legacy readers', () => {
  const page = { id: 'page-id', type: 'collection_view_page', view_ids: ['view-id'] }
  const collection = { id: 'collection-id', schema: { title: { type: 'title' } } }
  const view = { id: 'view-id', type: 'table' }
  const response = {
    cursor: { stack: [] },
    recordMap: {
      __version__: 3,
      block: { 'page-id': wrap(page) },
      collection: { 'collection-id': wrap(collection) },
      collection_view: { 'view-id': wrap(view) }
    }
  }

  assert.equal(normalizeNotionResponse(response), response)
  assert.equal(response.recordMap.block['page-id'].value, page)
  assert.equal(response.recordMap.collection['collection-id'].value.schema.title.type, 'title')
  assert.equal(response.recordMap.collection_view['view-id'].value.type, 'table')
  assert.equal(response.recordMap.block['page-id'].role, 'reader')
  assert.equal(response.recordMap.block['page-id'].spaceId, 'space-id')
  assert.equal(response.recordMap.__version__, 3)
  assert.deepEqual(response.cursor, { stack: [] })
})

test('getBlocks responses keep content and image properties readable after merging', () => {
  const image = {
    id: 'image-id',
    type: 'image',
    properties: { source: [['attachment:image-id:diagram.png']] }
  }
  const response = { recordMap: { block: { 'image-id': wrap(image) } } }
  const recordMap = { block: { 'page-id': { value: { id: 'page-id', content: ['image-id'] } } } }

  Object.assign(recordMap.block, normalizeNotionResponse(response).recordMap.block)
  const childId = recordMap.block['page-id'].value.content[0]
  assert.equal(recordMap.block[childId].value.type, 'image')
  assert.equal(recordMap.block[childId].value.properties.source[0][0], 'attachment:image-id:diagram.png')
})

test('getUsers responses preserve the existing recordMapWithRoles lookup', () => {
  const user = { id: 'user-id', given_name: 'Rui', family_name: 'Wang' }
  const response = { recordMapWithRoles: { notion_user: { 'user-id': wrap(user) } } }

  const result = normalizeNotionResponse(response)
  assert.equal(result.recordMapWithRoles.notion_user['user-id'].value, user)
  assert.equal(result.recordMapWithRoles.notion_user['user-id'].value.given_name, 'Rui')
})

test('legacy entries, denied entries, and collection query results remain intact', () => {
  const legacy = { role: 'reader', value: { id: 'legacy-id', type: 'page' } }
  const denied = { role: 'none' }
  const query = { collection_group_results: { blockIds: ['legacy-id'], hasMore: false } }
  const recordMap = {
    block: { 'legacy-id': legacy, 'denied-id': denied },
    collection_query: { 'collection-id': { 'view-id': query } },
    signed_urls: { 'image-id': 'https://example.com/signed-image' }
  }

  assert.equal(normalizeNotionRecordMap(recordMap), recordMap)
  assert.equal(recordMap.block['legacy-id'], legacy)
  assert.equal(recordMap.block['denied-id'], denied)
  assert.equal(recordMap.collection_query['collection-id']['view-id'], query)
  assert.equal(recordMap.signed_urls['image-id'], 'https://example.com/signed-image')
})

test('normalization is idempotent and does not unwrap an actual record value field', () => {
  const actualRecord = { id: 'record-id', role: 'reader', value: { label: 'keep this field' } }
  const recordMap = { block: { 'record-id': wrap(actualRecord) } }

  normalizeNotionRecordMap(recordMap)
  const normalized = recordMap.block['record-id']
  normalizeNotionRecordMap(recordMap)

  assert.equal(recordMap.block['record-id'], normalized)
  assert.equal(recordMap.block['record-id'].value, actualRecord)
  assert.deepEqual(actualRecord.value, { label: 'keep this field' })
})

test('responses without record maps and unsuccessful empty responses pass through', () => {
  const signedResponse = { signedUrls: ['https://example.com/signed-image'] }
  assert.equal(normalizeNotionResponse(signedResponse), signedResponse)
  assert.equal(normalizeNotionResponse(null), null)
  assert.equal(normalizeNotionResponse(undefined), undefined)
  assert.equal(normalizeNotionRecordMap(null), null)
  assert.equal(normalizeNotionRecordMap({ block: null }).block, null)
})
