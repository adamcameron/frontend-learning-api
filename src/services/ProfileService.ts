import { Client } from 'pg'
import { DbConnectionService } from './DbConnectionService.js'

export type Profile = {
  id: number
  src: string
  alt: string
}
export class ProfileService {
  async get(): Promise<Profile[]> {
    const client = new Client(DbConnectionService.getConfig())

    await client.connect()
    const result = await client.query<Profile>(
      'SELECT id, src, alt FROM profiles'
    )
    await client.end()

    return result.rows
  }
}
