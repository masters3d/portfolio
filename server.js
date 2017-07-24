'use strict';
const port = parseInt(process.env.PORT || '3000')
const express = require('express')
const cors = require('cors')
let app = express()

app.options('*', cors())

app.get('*', function(){});

app.use(express.static('.'))

app.listen(port, function() {
  console.info(`App is running on port ${port}`)
  console.info(`http://localhost:${port}/`)
})
