import express from 'express'
import { Profile, ProfileService } from './services/ProfileService.js'

const app = express()
app
  .get('/', (req, res) => res.send("G'day World"))
  .get('/profiles', async (req, res) => {
    const profiles: Profile[] = await new ProfileService().get()
    res.type('application/json').send(JSON.stringify(profiles))
  })
export { app }
