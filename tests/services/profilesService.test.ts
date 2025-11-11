import { describe, it, expect } from 'vitest'
import {
  ProfileService,
  ProfileError,
} from '../../src/services/ProfileService.js'

describe('Tests of ProfileService', () => {
  describe('Tests of create', () => {
    it.each([
      null,
      {},
      { a: 'b' },
      { src: 'src valid but alt missing' },
      { alt: 'alt valid but src missing' },
      { src: 'src valid but alt empty', alt: '' },
      { alt: 'alt valid but src empty', src: '' },
    ])(
      'throws an exception if the body is not valid [%s]',
      async (value: unknown) => {
        const service = new ProfileService()
        const errorDetail = JSON.stringify(value)

        await expect(async () => {
          await service.create(value)
        }).rejects.toThrowError(
          new ProfileError(
            `object [${errorDetail}] cannot be used as a NewProfile`
          )
        )
      }
    )
  })
})
