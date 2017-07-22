'use strict';
const fs = require('fs')
const parser = require('xml2json');

fs.readFile('data/medium-feed.xml', function(err, data) {
  if (err) console.error(err)
  const xml = data.toString()
  const json = JSON.parse(parser.toJson(xml))
  const items = json['rss']['channel']['item']

  let objects = []
  for (let each of items){
    let date = each['atom:updated']
    let source = each['content:encoded']
    let title = each['title']
    let link = each['link']
    let description = each['category']
    // let media = new Media(source, 'article', '', 'medium')
    // let project = new Project('PRO', title, link, media, description, date )

let article = {
      type: 'pro',
      name: title,
      link: link,
      description: description,
      date: date,
      media: {
        source: source,
        elementType: 'article',
        id: link ,
        provider: 'medium'
      },
    }
    objects.push(article)
  }

  fs.writeFile("data/medium.json",JSON.stringify(objects), function(err){
  console.error(err)
  }); 


});
