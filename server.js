'use strict';
const port = parseInt(process.env.PORT || '3000')
const express = require('express')
var app = express()

app.use(express.static('.'))

app.listen(port, function() {
  console.log(`App is running on port ${port}`)
  console.log(`http://localhost:${port}/`)
})
