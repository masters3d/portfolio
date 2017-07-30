
'use strict';

class NetworkController {
}

/**
 * This will get my current activity on github. It will be authenticated if there
 * if ajaxPasswords exist otherwise it will be unathenticated
 * @param {function(Object[]):void} processDataFunc */
NetworkController.getGithubBio = function(processDataFunc) {
  let url = `/github/https://api.github.com/users/masters3d`
  $.get(url).then(function(data){
    processDataFunc(data)
  }).catch(function(error) {
    console.error(error)
  })
}

/**
 * This will go out and reach to my medium posts and imports them as projects
 * The post has to have picture in order to be included in my projects
 * @param {function(Object[]): void} dataCallBack */
NetworkController.getBlogPostsAndCallBack = function(dataCallBack) {
  const url = '/xml/https://tech.masters3d.com/feed'
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
        let contentsFirstP = ViewManager.shorternString(contents.find('p').first().text(), 100)
        let title = cleaningCDATA(element.find('title').first().text())
        let link = cleaningCDATA(element.find('link').first().text())
        let pubDate = cleaningCDATA(element.find('pubDate').first().text())
        let imageLink = contents.find('img').first().attr('src') || ''
        let article = {
          type: 'pro', name: ViewManager.shorternString(title, 30), link: link,
          description: contentsFirstP,
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
