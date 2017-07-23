'use strict';
const fs = require('fs')
const parser = require('xml2json');
const { StringDecoder } = require('string_decoder');
const htmlToText = require('html-to-text');


/*
  TODO: load from the server instead of local XML. 
  ```
  const https = require('https');
  https.get('https://tech.masters3d.com/feed', function(response) {
   response.on('data', data => {
  ```
  The above method returns a file that contains random white space and breaks the xml2json parser.
  I need to investigave the difference between converting a Stream to a string vs downloading the xml with a Browser.
*/

fs.readFile('data/source/medium-feed.xml', function(err, data) {
  if (err) console.error(err)

  let xml = ''
  if (typeof data === 'string') {
    xml = data
  } else {
    let decoder = new StringDecoder();
    xml = decoder.write(data)
  }
  /** @type {Object} json */
  const json = parser.toJson(xml, {object: true})

  const items = json['rss']['channel']['item']

  let objects = []
  for (let each of items){
    let date = each['atom:updated']
    let source = each['content:encoded']
    let title = each['title']
    let link = each['link']
    let description = each['category']

    let bodyCleanedUp = htmlToText.fromString(source, { ignoreHref: true, preserveNewlines: true, })

    let article = {
      type: 'pro',
      name: title,
      link: link,
      description: description,
      date: date,
      media: {
        source: bodyCleanedUp.split('\n').join('<br>'),
        elementType: 'article',
        id: link ,
        provider: 'medium'
      },
    }
    objects.push(article)
  }

  fs.writeFile('data/medium.json',JSON.stringify(objects, null, 2), function(err){
    console.error(err)
  });
})
