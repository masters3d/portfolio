
'use strict';

/** @type {Object} */
var ajaxPasswords = ajaxPasswords || { github: ''} // eslint-disable-line no-var

class NetworkController {
}

/** @param {function(Object):void} processDataFunc */
NetworkController.getGithubRecentActivity = function(processDataFunc) {
  let headers = ajaxPasswords.github ? {Authorization: `token ${ajaxPasswords.github}`} : {}
  let url = `https://api.github.com/users/masters3d/events`
  $.ajax({url, headers}).then(function(data){
    processDataFunc(data)
  }).catch(function(error) {
    console.error(error)
  })
}

/** @param {function(Object[]): void} dataCallBack */
Controller.getBlogPostsAndCallBack = function(dataCallBack) {
  const url = 'https://cors-anywhere.herokuapp.com/https://tech.masters3d.com/feed'
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'xml',
    success: function(xml){
      /** @param {string} input */
      let cleaningCDATA = (input) => {return input.replace('<![CDATA[', '').replace(']]>', '')}

      /** @type {Object[]} array */
      let array = []
      let div = $(document.createElement('div'))
      let items = $(xml).find('item')
      items.each( function(){
        let element = $(this)
        let contents = div.clone().html(cleaningCDATA(element.children().last().text()))
        let title = cleaningCDATA(element.find('title').first().text())
        let link = cleaningCDATA(element.find('link').first().text())
        let pubDate = cleaningCDATA(element.find('pubDate').first().text())
        let imageLink = contents.find('img').first().attr('src') || ''
        let article = {
          type: 'pro', name: title, link: link,
          description: contents.find('p').first().text(),
          date: pubDate,
          media: {
            source: imageLink, elementType: 'image', id: '' , provider: ''
          }
        }
        //If image has valid ending
        if (imageLink){
          let imageLinkParts = imageLink.split('.')
          let imageLength = imageLinkParts.length
          if (imageLinkParts.length > 1) {
            let type = imageLinkParts[imageLength - 1]
            if ( type === 'jpeg' || type === 'jpeg' ||
              type === 'gif' || type === 'png') {
              array.push(article)
            }
          }
        }
      }
      )
      dataCallBack(array)
    } // End of Success
  }).catch(function(request){
    console.error(request)
  }) // End of AJAX call
} // End of Main Call