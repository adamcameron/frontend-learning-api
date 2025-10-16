import { describe, it, expect } from 'vitest'

describe('Tests endpoints defined in server.ts', () => {
  describe('/', () => {
    it("returns G'day World", async () => {
      const response = await fetch('http://localhost:3000/')

      const text = await response.text()
      expect(text).toBe("G'day World")
    })
  })
})
