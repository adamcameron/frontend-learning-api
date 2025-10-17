import { describe, it, expect } from 'vitest'
import { DbConnectionService } from '../../src/services/DbConnectionService.js'
import { ClientConfig } from 'pg'

describe('Tests DbConnectionService', () => {
  describe('getConfig tests', () => {
    it('creates a ClientConfig object from environment values', () => {
      const clientConfig: ClientConfig = DbConnectionService.getConfig()

      const nonEmpty: RegExp = /.+/
      expect(clientConfig).toEqual({
        host: expect.stringMatching(nonEmpty) as string,
        port: expect.anything() as number,
        user: expect.stringMatching(nonEmpty) as string,
        password: expect.stringMatching(nonEmpty) as string,
        database: expect.stringMatching(nonEmpty) as string,
      })
      expect(String(clientConfig.port)).toMatch(nonEmpty)
    })
  })
})
