import crypto from 'crypto'
import fs from 'fs'

const path = require('path')
const cacheInvalidMs = 1000000000 * 1000
const cacheDir = path.resolve('./.cache/notion-next')

function ensureCacheDir() {
  fs.mkdirSync(cacheDir, { recursive: true })
}

function getCacheFile(key) {
  const hash = crypto.createHash('sha1').update(key).digest('hex')
  return path.join(cacheDir, `${hash}.json`)
}

function readCacheFile(file) {
  if (!fs.existsSync(file)) {
    return null
  }

  try {
    const data = fs.readFileSync(file, 'utf8')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.warn('读取文件缓存失败', file, error)
    return null
  }
}

export async function getCache(key) {
  const file = getCacheFile(key)
  const cached = readCacheFile(file)
  if (!cached) {
    return null
  }

  const cacheValidTime = new Date((cached.expireTime || 0) + cacheInvalidMs)
  if (!cached.expireTime || cacheValidTime < new Date()) {
    try {
      fs.unlinkSync(file)
    } catch (error) {
      console.warn('清理过期缓存失败', file, error)
    }
    return null
  }

  return cached.value ?? null
}

/**
 * Build 阶段需要跨 Next.js worker 共享缓存，所以使用单 key 单文件。
 * 临时文件 + rename 能尽量减少并发写坏缓存的概率。
 */
export async function setCache(key, data) {
  ensureCacheDir()
  const file = getCacheFile(key)
  const tempFile = `${file}.${process.pid}.${Date.now()}.tmp`
  const payload = {
    key,
    expireTime: Date.now(),
    value: data
  }

  fs.writeFileSync(tempFile, JSON.stringify(payload))
  fs.renameSync(tempFile, file)
}

export async function delCache(key) {
  const file = getCacheFile(key)
  if (!fs.existsSync(file)) {
    return
  }

  fs.unlinkSync(file)
}

/**
 * 清理缓存
 */
export async function cleanCache() {
  fs.rmSync(cacheDir, { recursive: true, force: true })
}

export default { getCache, setCache, delCache }
