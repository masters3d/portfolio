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

app.get('/github/*', function(request, response) {
  let headers = process.env.GITHUB_TOKEN ? {Authorization: `token ${process.env.GITHUB_TOKEN}`} : {};
  let url = `${request.params[0]}`;
  (requestProxy({url, headers}))(request, response)
})