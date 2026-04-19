/**
 * Normalize old and new Notion response shapes into the legacy structure that
 * the rest of this codebase expects.
 */

export function normalizeNotionMetadata(block, pageId) {
  const rawValue = block?.[pageId]?.value

  if (!rawValue) {
    return null
  }

  return rawValue.type ? rawValue : rawValue.value ?? null
}

export function normalizeCollection(collection) {
  let current = collection

  for (let i = 0; i < 3; i++) {
    if (!current) {
      break
    }

    if (current.schema) {
      return current
    }

    if (current.value) {
      current = current.value
      continue
    }

    break
  }

  return current ?? {}
}

export function normalizeSchema(schema = {}) {
  const result = {}

  Object.entries(schema).forEach(([key, value]) => {
    result[key] = {
      ...value,
      name: value?.name || '',
      type: value?.type || ''
    }
  })

  return result
}

export function normalizePageBlock(blockItem) {
  if (!blockItem) {
    return null
  }

  let current = blockItem

  for (let i = 0; i < 5; i++) {
    if (!current) {
      return null
    }

    if (
      (current.type === 'collection_view_page' ||
        current.type === 'collection_view') &&
      current.collection_id
    ) {
      return current
    }

    if (current.type || current.properties) {
      return current
    }

    if (current.value) {
      current = current.value
      continue
    }

    break
  }

  return null
}
