/**
 * Notion now wraps some records in { spaceId, value: { value, role } }.
 * Normalize at the API boundary so existing code can keep reading entry.value.id.
 * Already compatible records and unrelated API metadata are left untouched.
 */
export function normalizeNotionRecordMap(recordMap) {
  if (!recordMap || typeof recordMap !== 'object') return recordMap

  for (const table of Object.values(recordMap)) {
    if (!table || typeof table !== 'object' || Array.isArray(table)) continue

    for (const [id, record] of Object.entries(table)) {
      const wrapper = record?.value
      if (
        wrapper &&
        !wrapper.id &&
        typeof wrapper.role === 'string' &&
        wrapper.value &&
        typeof wrapper.value === 'object'
      ) {
        table[id] = { ...record, ...wrapper }
      }
    }
  }

  return recordMap
}

export function normalizeNotionResponse(response) {
  if (!response || typeof response !== 'object') return response

  normalizeNotionRecordMap(response.recordMap)
  normalizeNotionRecordMap(response.recordMapWithRoles)
  return response
}
