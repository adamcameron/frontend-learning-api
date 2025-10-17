import { ClientConfig } from 'pg'
import fs from 'fs'

export class DbConnectionService {
  static getConfig(): ClientConfig {
    const pwd: string = fs
      .readFileSync(process.env.POSTGRES_PASSWORD_FILE!, 'utf8')
      .trim()
    return {
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      user: process.env.PGUSER,
      password: pwd,
      database: process.env.PGDATABASE,
    }
  }
}
