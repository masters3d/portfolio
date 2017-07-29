'use strict';
const port = parseInt(process.env.PORT || '3000')
const express = require('express')
const requestProxy = require('express-request-proxy')
const errorResponse = 'Sorry can\'t find that! <a href="/">Go Home</a>'

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

let menuItems = require('./scripts/models/model.js').menuItems

app.get('/:tab', function (req, res) {
  let title = req.params.tab
  for (let type in menuItems) {
    let tabTitle = menuItems[type].title
    if (tabTitle=== title) {
      res.sendfile('index.html')
      console.log('Found it')
      return;
    }
  }
  res.status(404).send(errorResponse)
})

app.get('*', function(req, res){
  res.status(404).send(errorResponse)
})