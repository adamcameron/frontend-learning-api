import { Client } from 'pg'
import { DbConnectionService } from './DbConnectionService.js'

export type Profile = {
  id: number
  src: string
  alt: string
}

export type NewProfile = {
  src: string
  alt: string
}

export class ProfileService {
  async get(): Promise<Profile[]> {
    const client = new Client(DbConnectionService.getConfig())

    try {
      await client.connect()
      const result = await client.query<Profile>(
        'SELECT id, src, alt FROM profiles'
      )
      return result.rows
    } finally {
      await client.end()
    }
  }

  async create(profileValues: unknown): Promise<Profile> {
    const newProfile = this.validateNewProfileValues(profileValues)

    const client = new Client(DbConnectionService.getConfig())
    try {
      await client.connect()
      const result = await client.query<Profile>(
        'INSERT INTO profiles (src, alt) VALUES ($1, $2) RETURNING *',
        [newProfile.src, newProfile.alt]
      )
      return result.rows[0]
    } finally {
      await client.end()
    }
  }

  private validateNewProfileValues(values: unknown): NewProfile {
    if (this.isNewProfile(values)) {
      return values
    }
    throw new ProfileError(
      `object [${JSON.stringify(values)}] cannot be used as a NewProfile`
    )
  }

  private isNewProfile(values: unknown): values is NewProfile {
    const obj = values as object
    return (
      obj !== null &&
      'src' in obj &&
      String(obj.src).length > 0 &&
      'alt' in obj &&
      String(obj.alt).length > 0
    )
  }
}

export class ProfileError extends Error {}
