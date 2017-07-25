/// <reference types="page" />
'use strict';

page('*', function(ctx) {
  let title = (ctx.params[0]).slice(1)
  let anchorid = ctx.hash || ''

  if (anchorid){
    let anchor = '#' + anchorid;
    //https://api.jquery.com/scrollTop/ https://api.jquery.com/offset/
    let offset = ($(anchor).offset() || {top:0}).top
    $('html, body').scrollTop(offset)
  }

  for (let type in Data.menuItems) {
    if (Data.menuItems[type].title === title) {
      Controller.pageNavControl(type)
      return;
    }
  }
  Controller.pageNavControl('hom')
})

page({click:true, hashbang:false})