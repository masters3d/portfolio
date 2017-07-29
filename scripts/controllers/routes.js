/// <reference types="page" />
'use strict';

app.startUp()
/**
 * This middle ware detects any # id on the top of the and mimic native anchor behavior
 * @param {PageJS.Context} ctx
 * @param {function():void} next
*/
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

page('/', scrowToArticleOnHashIdMidleware, function() {
  ViewManager.pageNavControl(app.home)
})

page('/:tab', scrowToArticleOnHashIdMidleware, function(ctx) {
  let title = ctx.params.tab
  // Prevent giving an error on a cold start to an specific tab.
  if (!(typeof app === 'undefined' || typeof app.data === 'undefined' || typeof app.data.menuItems === 'undefined')) {
    for (let type in app.data.menuItems) {
      if (app.data.menuItems[type].title === title) {
        ViewManager.pageNavControl(type)
        return;
      }
    }
  }
  ViewManager.pageNavControl(app.home)
  // If it can not find a tab name, trigger a reload to kick pages.js into action.
  location.reload();
})

page('*', scrowToArticleOnHashIdMidleware, function() {
  ViewManager.pageNavControl(app.home)
})

page({click:true, hashbang:false})
