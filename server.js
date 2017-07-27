'use strict';
const port = parseInt(process.env.PORT || '3000')
const express = require('express')
const requestProxy = require('express-request-proxy')

let app = express()

app.use(express.static('.'))

app.listen(port, function() {
  console.info(`App is running on port ${port}. Started at ${new Date()}`)
  console.info(`http://localhost:${port}/`)
})

app.get('/xml/*', function(request, response) {
  (requestProxy({
    url: `${request.params[0]}`,
  }))(request, response)
})