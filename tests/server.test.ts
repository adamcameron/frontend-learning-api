import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/server.js'

import { StatusCodes } from 'http-status-codes'

describe('Tests endpoints defined in server.ts', () => {
  describe('/', () => {
    it("returns G'day World", async () => {
      const response = await request(app).get('/').expect(StatusCodes.OK)

      expect(response.text).toEqual("G'day World")
    })
  })
})
