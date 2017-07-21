'use strict';
const port = parseInt(process.env.PORT || '3000')
const express = require('express')
let app = express()

app.use(express.static('.'))

app.listen(port, function() {
  console.info(`App is running on port ${port}`)
  console.info(`http://localhost:${port}/`)
})
