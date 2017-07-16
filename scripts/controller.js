/// <reference types="jquery" />
/// <reference types="handlebars" />
'use strict';

var Controller = {}
// Display the date as a relative number of 'days ago' on hover
Controller.timeHoverRegister = function() { // eslint-disable-line
  $('span[data-date]').hover(function(){
  /** @type {HTMLSpanElement} span */ 
    const span = this
    const today = new Date()
    const attibute = span.getAttribute('data-date')
    if (attibute !== null) {
      const publishedOn = new Date(attibute)
      const difference = today.getTime() - publishedOn.getTime()
      let daysAgo = `Created ${parseInt(`${difference/60/60/24/1000}`)} days ago.`
      span.textContent = daysAgo;
    } else {
      console.warn('attibute is null')
    }
  }, function(){
    const attibute = this.getAttribute('data-date')
    if (attibute !== null) {
      this.textContent = attibute;
    } else {
      console.warn('attibute is null')
    }
  })
}

Controller.createMenuHtml = function() {
  let menuObjects = {}
  // menuItems is the name expected by handlebars on the template
  menuObjects.menuItems = []
  for (let each of Data.menuItems){
    let [title, type] = each.split('|')
    type = type.toLowerCase()
    menuObjects.menuItems.push({title, type})
  }
  let handlebarsTemplateString = jQuery('#handlebarsMenuTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(menuObjects);
  return html;
}

Handlebars.registerHelper('mediaCreateHtml',
/** @param {Media} media 
*/
  function(media) {
    if (!media.source || media.elementType === 'video'){
      switch(media.provider){
      case 'vimeo':
        return `<iframe width="560" height="315" src="https://player.vimeo.com/video/${media.id}" frameborder="0" allowfullscreen></iframe>`
      case 'youtube':
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${media.id}?ecver=1" frameborder="0" allowfullscreen></iframe>`
      }
    } else if (media.source && media.elementType === 'image') {
      return `<img width="560" src="${media.source}">`
    }
    return '';
  });