import fs from 'fs'

export class RateLimiter {
  constructor({ minIntervalMs = 350, lockFilePath } = {}) {
    this.queue = []
    this.isProcessing = false
    this.lastRequestTime = 0
    this.minIntervalMs = minIntervalMs
    this.lockFilePath = lockFilePath
  }

  async acquireLock() {
    if (!this.lockFilePath) {
      return
    }

    if (fs.existsSync(this.lockFilePath)) {
      const stats = fs.statSync(this.lockFilePath)
      const age = Date.now() - stats.ctimeMs
      if (age > 30 * 1000) {
        try {
          fs.unlinkSync(this.lockFilePath)
        } catch (error) {
          console.warn('[RateLimiter] failed to clear stale lock', error)
        }
      }
    }

    while (true) {
      try {
        fs.writeFileSync(this.lockFilePath, String(process.pid), { flag: 'wx' })
        return
      } catch (error) {
        if (error?.code !== 'EEXIST') {
          throw error
        }
        await new Promise(resolve => setTimeout(resolve, 80))
      }
    }
  }

  releaseLock() {
    if (!this.lockFilePath) {
      return
    }

    try {
      if (fs.existsSync(this.lockFilePath)) {
        fs.unlinkSync(this.lockFilePath)
      }
    } catch (error) {
      console.warn('[RateLimiter] failed to release lock', error)
    }
  }

  enqueue(key, requestFunc) {
    return new Promise((resolve, reject) => {
      this.queue.push({ key, requestFunc, resolve, reject })
      if (!this.isProcessing) {
        this.processQueue()
      }
    })
  }

  async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false
      return
    }

    this.isProcessing = true
    const { requestFunc, resolve, reject } = this.queue.shift()

    try {
      await this.acquireLock()

      const waitTime = Math.max(
        0,
        this.minIntervalMs - (Date.now() - this.lastRequestTime)
      )
      if (waitTime > 0) {
        await new Promise(r => setTimeout(r, waitTime))
      }

      const result = await requestFunc()
      this.lastRequestTime = Date.now()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.releaseLock()
      setTimeout(() => this.processQueue(), 0)
    }
  }
}
