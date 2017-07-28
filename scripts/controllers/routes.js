/// <reference types="page" />
'use strict';


let scrowToArticleOnHashIdMidleware = (ctx, next) => {
  let anchorid = ctx.hash || ''
  if (anchorid){
    let anchor = '#' + anchorid;
    //https://api.jquery.com/scrollTop/ https://api.jquery.com/offset/
    let offset = ($(anchor).offset() || {top:0}).top
    $('html, body').scrollTop(offset)
  }
  next()
}


page('*', scrowToArticleOnHashIdMidleware, function(ctx) {
  let title = (ctx.params[0]).slice(1)
  for (let type in Data.menuItems) {
    if (Data.menuItems[type].title === title) {
      ViewManager.pageNavControl(type)
      return;
    }
  }
  ViewManager.pageNavControl('hom')
})

page({click:true, hashbang:false})
