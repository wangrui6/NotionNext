import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NotionRenderer } from 'react-notion-x'
import { getRenderableRecordMap } from '../lib/notion/getRenderableRecordMap.mjs'

const pageId = '11111111-1111-4111-8111-111111111111'
const assetId = '22222222-2222-4222-8222-222222222222'
const textId = '33333333-3333-4333-8333-333333333333'
const brokenFile = 'file-P9p7lchg7YcL1izxnWMR4qnr'

function recordMap(source, { type = 'image', signedSource } = {}) {
  return {
    block: {
      [pageId]: {
        role: 'reader',
        value: {
          id: pageId,
          type: 'page',
          properties: { title: [['Article with attachment']] },
          content: [textId, assetId]
        }
      },
      [textId]: {
        role: 'reader',
        value: {
          id: textId,
          type: 'text',
          parent_id: pageId,
          properties: { title: [['The article body survives.']] }
        }
      },
      [assetId]: {
        role: 'reader',
        value: {
          id: assetId,
          type,
          parent_id: pageId,
          space_id: 'space-id',
          properties: {
            source: [[source]],
            caption: [['Recommendation architecture', [['b']]]]
          }
        }
      }
    },
    signed_urls: signedSource ? { [assetId]: signedSource } : {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {}
  }
}

function deepFreeze(value) {
  if (value && typeof value === 'object') {
    Object.freeze(value)
    for (const child of Object.values(value)) deepFreeze(child)
  }
  return value
}

test('the real malformed file token cannot crash SSR or hide article text/caption', () => {
  const original = recordMap(brokenFile)
  assert.throws(
    () =>
      renderToStaticMarkup(
        React.createElement(NotionRenderer, {
          recordMap: original
        })
      ),
    { code: 'ERR_INVALID_URL' }
  )

  const rendered = renderToStaticMarkup(
    React.createElement(NotionRenderer, {
      recordMap: getRenderableRecordMap(original)
    })
  )
  assert.match(rendered, /The article body survives\./)
  assert.match(rendered, /Attachment unavailable/)
  assert.match(rendered, /Recommendation architecture/)
  assert.match(rendered, /<b>Recommendation architecture<\/b>/)
  assert.doesNotMatch(rendered, /file-P9p7lchg7YcL1izxnWMR4qnr/)
})

test('render preparation never mutates cached records and shares unaffected blocks', () => {
  const original = deepFreeze(recordMap(brokenFile))
  const before = JSON.stringify(original)
  const prepared = getRenderableRecordMap(original)
  assert.notEqual(prepared, original)
  assert.notEqual(prepared.block[assetId], original.block[assetId])
  assert.equal(prepared.block[textId], original.block[textId])
  assert.equal(prepared.block[pageId], original.block[pageId])
  assert.equal(prepared.collection, original.collection)
  assert.equal(JSON.stringify(original), before)
  assert.equal(getRenderableRecordMap(prepared), prepared)
})

test('valid absolute URLs and Notion attachment URLs pass through unchanged', () => {
  for (const source of [
    'https://images.example.com/diagram.png?signature=abc',
    'http://images.example.com/diagram.png',
    'attachment:22222222-2222-4222-8222-222222222222:diagram.png',
    'data:image/png;base64,aGVsbG8='
  ]) {
    const original = deepFreeze(recordMap(source))
    assert.equal(getRenderableRecordMap(original), original)
  }
})

test('a valid signed URL rescues a malformed property source and remains preferred', () => {
  const signedSource = 'https://file.notion.so/signed/diagram.png?signature=abc'
  const original = deepFreeze(recordMap(brokenFile, { signedSource }))
  const prepared = getRenderableRecordMap(original)
  assert.equal(prepared.block[assetId].value.type, 'image')
  assert.equal(
    prepared.block[assetId].value.properties.source[0][0],
    signedSource
  )
  assert.equal(prepared.signed_urls[assetId], signedSource)
  assert.doesNotThrow(() =>
    renderToStaticMarkup(
      React.createElement(NotionRenderer, {
        recordMap: prepared
      })
    )
  )

  const bothValid = recordMap('https://example.com/unsigned.png', {
    signedSource
  })
  assert.equal(getRenderableRecordMap(bothValid), bothValid)
})

test('a malformed signed URL cannot override a valid property source', () => {
  const original = deepFreeze(
    recordMap('https://example.com/diagram.png', {
      signedSource: brokenFile
    })
  )
  const prepared = getRenderableRecordMap(original)
  assert.equal(prepared.block, original.block)
  assert.equal(prepared.signed_urls[assetId], 'https://example.com/diagram.png')
  assert.equal(original.signed_urls[assetId], brokenFile)
})

test('relative Notion image paths are normalized before the renderer parses them', () => {
  for (const source of [
    '/images/page-cover/woodcuts_1.jpg',
    '/image/attachment%3Aid%3Aimage.png'
  ]) {
    const original = deepFreeze(recordMap(source))
    const prepared = getRenderableRecordMap(original)
    assert.equal(
      prepared.block[assetId].value.properties.source[0][0],
      'https://www.notion.so' + source
    )
    assert.doesNotThrow(() =>
      renderToStaticMarkup(
        React.createElement(NotionRenderer, {
          recordMap: prepared
        })
      )
    )
  }
  const signed = getRenderableRecordMap(
    recordMap(brokenFile, { signedSource: '/images/emoji/twitter/1f600.png' })
  )
  assert.equal(
    signed.signed_urls[assetId],
    'https://www.notion.so/images/emoji/twitter/1f600.png'
  )
})

test('other attachment renderers get the same fallback without changing unrelated blocks', () => {
  for (const type of ['file', 'audio', 'pdf', 'embed', 'video']) {
    const prepared = getRenderableRecordMap(recordMap(brokenFile, { type }))
    assert.equal(prepared.block[assetId].value.type, 'text')
  }
  const text = recordMap(brokenFile, { type: 'text' })
  assert.equal(getRenderableRecordMap(text), text)
  assert.equal(getRenderableRecordMap(undefined), undefined)
  assert.equal(getRenderableRecordMap(null), null)
})
