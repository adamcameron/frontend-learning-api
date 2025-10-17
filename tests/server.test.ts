import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/server.js'
import type { Profile } from '../src/services/ProfileService.js'

import { StatusCodes } from 'http-status-codes'

describe('Tests endpoints defined in server.ts', () => {
  describe('/', () => {
    it("returns G'day World", async () => {
      const response = await request(app).get('/').expect(StatusCodes.OK)

      expect(response.text).toEqual("G'day World")
    })
  })
  describe('/profiles', () => {
    it('returns an array of profiles for a GET', async () => {
      const response = await request(app)
        .get('/profiles')
        .expect(StatusCodes.OK)
      expect(Array.isArray(response.body)).toBe(true)
      if (!Array.isArray(response.body)) {
        return
      }
      expect(response.body.length).toBeGreaterThan(0)

      response.body.forEach((profile: Profile) => {
        expect(profile).toEqual({
          id: expect.any(Number) as number,
          src: expect.any(String) as string,
          alt: expect.any(String) as string,
        })
      })
    })
  })
})
