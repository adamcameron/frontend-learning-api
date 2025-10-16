import express from 'express'
const app = express()

app.get('/', function (req, res) {
  return res.send("G'day World!!!")
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
