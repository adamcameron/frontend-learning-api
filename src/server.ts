import express from 'express'
import cors from 'cors'
import {
  Profile,
  ProfileService,
  ProfileError,
} from './services/ProfileService.js'
import { StatusCodes } from 'http-status-codes'

const app = express()

const corsOptions: cors.CorsOptions = {
  origin: process.env.CLIENT_APP_CORS_ORIGIN,
  optionsSuccessStatus: StatusCodes.OK, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app
  .get('/', (req, res) => res.send("G'day World"))
  .get('/profiles', async (req, res) => {
    const profiles: Profile[] = await new ProfileService().get()
    res.type('application/json').send(JSON.stringify(profiles))
  })
  .post('/profiles', async (req, res) => {
    try {
      const profile: Profile = await new ProfileService().create(req.body)
      res
        .type('application/json')
        .status(StatusCodes.CREATED)
        .send(JSON.stringify(profile))
    } catch (e) {
      if (e instanceof ProfileError) {
        res
          .type('application/json')
          .status(StatusCodes.BAD_REQUEST)
          .send({
            message: `[${JSON.stringify(req.body)}] is not valid`,
            detail: "object must contain populated 'src' and 'alt' properties",
          })
        return
      }
      throw e
    }
  })
export { app }
