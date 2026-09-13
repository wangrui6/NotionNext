const ASSET_TYPES = new Set([
  'image',
  'audio',
  'file',
  'video',
  'pdf',
  'embed',
  'replit',
  'tweet',
  'maps',
  'figma',
  'typeform',
  'codepen',
  'excalidraw',
  'gist',
  'drive'
])

function renderableSource(source, type) {
  if (typeof source !== 'string' || !source.trim()) return null

  try {
    // Notion's built-in cover/icon paths are relative, but react-notion-x
    // parses asset URLs before the application's image mapper gets to run.
    if (type === 'image' && source.startsWith('/')) {
      return new URL(source, 'https://www.notion.so').toString()
    }

    const url = new URL(source)
    if (
      ['http:', 'https:', 'data:', 'blob:', 'attachment:'].includes(
        url.protocol
      )
    ) {
      return source
    }
  } catch {
    // An unresolved file token is not a URL and cannot be rendered as an asset.
  }

  return null
}

function unavailableAttachment(block) {
  const title = [['Attachment unavailable']]
  for (const text of [block.properties?.title, block.properties?.caption]) {
    if (Array.isArray(text) && text.length) title.push([' — '], ...text)
  }

  return {
    ...block,
    type: 'text',
    properties: { ...block.properties, title }
  }
}

/**
 * Prepare only asset blocks that react-notion-x cannot render safely.
 * Keep the original Notion response/cache intact and share unchanged records.
 */
export function getRenderableRecordMap(recordMap) {
  if (!recordMap?.block || typeof recordMap.block !== 'object') return recordMap

  let blocks = recordMap.block
  let signedUrls = recordMap.signed_urls

  for (const [key, record] of Object.entries(recordMap.block)) {
    const block = record?.value
    if (!block || !ASSET_TYPES.has(block.type)) continue
    // Drive cards with structured metadata use a different renderer.
    if (block.type === 'drive' && block.format?.drive_properties) continue

    const originalSource = block.properties?.source?.[0]?.[0]
    const originalSignedSource = recordMap.signed_urls?.[block.id]
    const signedSource = renderableSource(originalSignedSource, block.type)
    const propertySource = renderableSource(originalSource, block.type)
    const source = signedSource || propertySource
    let replacement = block

    if (!source) {
      replacement = unavailableAttachment(block)
    } else {
      // A signed file.notion.so image can make the renderer consult the original
      // source again. Repair an invalid/missing original even when signing worked.
      const usablePropertySource = propertySource || source
      if (usablePropertySource !== originalSource) {
        replacement = {
          ...block,
          properties: {
            ...block.properties,
            source: [[usablePropertySource]]
          }
        }
      }

      // Invalid signed values must not override a valid source; relative signed
      // image paths also need normalization before the renderer's URL parser.
      if (originalSignedSource && source !== originalSignedSource) {
        if (signedUrls === recordMap.signed_urls) signedUrls = { ...signedUrls }
        signedUrls[block.id] = source
      }
    }

    if (replacement !== block) {
      if (blocks === recordMap.block) blocks = { ...blocks }
      blocks[key] = { ...record, value: replacement }
    }
  }

  if (blocks === recordMap.block && signedUrls === recordMap.signed_urls) {
    return recordMap
  }
  return { ...recordMap, block: blocks, signed_urls: signedUrls }
}
