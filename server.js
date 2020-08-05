const config = require('./config')
const express = require('express')
const path = require('path')
const graceful = require('node-graceful')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./backend/routes')

const app = express()
const PORT = process.env.PORT || 4800

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')))

mongoose.connect(config.mongoDBUrl, {
  useNewUrlParser: true
})

const connection = mongoose.connection
connection.once('open', function() {
  console.log('MongoDB connection established')
})

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.log(err)
  next()
})

app.get('*', (req, res) => {
  return res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

const server = app.listen(PORT, err => {
  if (err) {
    console.error(err)
  }

  console.log(`Running on port ${PORT}`)
})

graceful.on('exit', done => {
  server.close(() => {
    done()
  })
})
