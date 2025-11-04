import express from 'express'
import cors from 'cors'
import { Profile, ProfileService } from './services/ProfileService.js'
import { StatusCodes } from 'http-status-codes'

const app = express()

const corsOptions: cors.CorsOptions = {
  origin: process.env.CLIENT_APP_CORS_ORIGIN,
  optionsSuccessStatus: StatusCodes.OK, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app
  .get('/', (req, res) => res.send("G'day World"))
  .get('/profiles', async (req, res) => {
    const profiles: Profile[] = await new ProfileService().get()
    res.type('application/json').send(JSON.stringify(profiles))
  })
export { app }
