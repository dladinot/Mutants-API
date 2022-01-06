const express = require('express')
const cors = require('cors')
const mapUrls = require('./url_mappings.js')
const app = express()
const port = process.env.PORT



function startApplication() {
  
  app.use(cors({
    origin: '*'
  }))
  app.use("/", mapUrls)
  app.set('trust proxy', true)
  app.listen(port, () => {
    console.log(`App listening at port ${port}`)
  })
}

module.exports = startApplication