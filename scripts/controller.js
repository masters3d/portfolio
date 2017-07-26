/// <reference types="jquery" />
/// <reference types="handlebars" />
'use strict';

let Controller = {}

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
  for (let type in Data.menuItems){
    let title = Data.menuItems[type].title
    let iconclass = Data.menuItems[type].icon
    type = type.toLowerCase()
    menuObjects.menuItems.push({title, type, iconclass})
  }
  let handlebarsTemplateString = jQuery('#handlebarsMenuTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(menuObjects);
  return html;
}

/** @param {string} type */
Controller.iconTypeClass = function(type){
  for(let category in Data.menuItems) {
    let iconClass = Data.menuItems[category].icon
    if (category.toLocaleLowerCase() === type.toLocaleLowerCase()) {
      return iconClass;
    }
  }
  return ''
}

Handlebars.registerHelper('applyIconType', Controller.iconTypeClass)

Handlebars.registerHelper('mediaCreateHtml',
/** @param {Media} media */
  function(media) {
    let iframeSize = 'width="1280" height="720"'
    let className = ''
    let toReturn = ''
    if (!media.source || media.elementType === 'video'){
      className = 'media-video'
      switch(media.provider){
      case 'vimeo':
        toReturn = `<iframe ${iframeSize} src="" data-src="https://player.vimeo.com/video/${media.id}" frameborder="0" allowfullscreen></iframe>`
        break;
      case 'youtube':
        toReturn = `<iframe ${iframeSize} src="" data-src="https://www.youtube.com/embed/${media.id}?ecver=1" frameborder="0" allowfullscreen></iframe>`
        break;
      }
    } else if (media.source && media.elementType === 'image') {
      className = 'media-image'
      toReturn = `<img src="" data-src="${media.source}">`
    } else if (media.source && media.elementType === 'article') {
      className = 'media-post'
      toReturn = toReturn = `<p>${media.source}</p>`
    }
    return `<section class="media ${className}">${toReturn}</section>`;
  });

/** @param {string} attibute */
Controller.pageNavControl = function(attibute) {
  attibute = attibute.toLowerCase()
  $('.tab').removeClass('tabActivated')
  $('article').hide();
  $(`*[data-type="${attibute}"]`).fadeIn();
  $(`.tab[data-type="${attibute}"]`).addClass('tabActivated')
  if (attibute === 'hom' || attibute === 'iam') {
    $('aside a').first().hide()
  } else {
    $('aside a').first().show()
  }
}

Controller.handlerShowAndHideAll = function() {
  $('aside a').first().on('click', function(event){
    event.preventDefault()
    let link = $(this)
    if (link.html() === 'Show All Media') {
      link.html('Hide All Media')
      $('.project-card .show').click()
    } else {
      link.html('Show All Media')
      $('.project-card .hide').click()
    }
  })
}

Controller.handlerShowAndHide = function() {
  $('.show, .hide').on('click', function(event){
    event.preventDefault()
    let mediaContainer = $(this).parent().siblings('.media')
    let mediaElemet = mediaContainer.children().first()
    let mediaSource = mediaElemet.attr('data-src') || ''
    if (this.className === 'show') {
      mediaSource ? mediaElemet.attr('src', mediaSource ) : 'do nothing'
      mediaContainer.fadeIn()
      this.className = 'hide'
    } else if (this.className === 'hide') {
      mediaContainer.hide()
      this.className = 'show'
    }
  });
}

/** @param {string} name */
Controller.shorternName = function(name) {
  let lengthToShorten = 14
  if (name.length < lengthToShorten) {
    return name;
  }
  return name.substring(0, lengthToShorten) + '...'
}

Controller.handlerRecentListShowAllName = function() {
  $('.asideLink').hover(function(){
    let link = $(this)
    let content = link.attr('data-name') || ''
    link.html(content)
  }, function(){
    let link = $(this)
    let content = link.attr('data-name') || ''
    link.html(Controller.shorternName(content))
  })
}

Controller.handlerRecentListTakeMeToTab = function() {
  $('.asideLink').on('click', function(/*event*/){
    let link = $(this)
    let dataType = link.attr('data-type') || ''
    let anchor = (link.attr('href') || '#')
    page(`/${Data.menuItems[dataType].title}`)
    let showHide = $(`${anchor}`).children('section').children('a').first()
    if(showHide.hasClass('show')) {
      showHide.click()
    }
  })
}
/** @param {Data} data */
Controller.updateCacheAgeOnFooter = function(data) {
  let seconds = `${data.howOldIsCacheInMiliSeconds()/1000}`
  $('footer p').html(`Cached ${parseInt(seconds)} Seconds ago`)
}

Controller.firstTabAsHomeInit = function(){
  $('.media').hide()
  let firstTabAsHome = $('.tab:first-child')
  firstTabAsHome.attr('href', '/')
  firstTabAsHome.click()
}