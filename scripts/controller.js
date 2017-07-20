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
    let [title, type, iconclass] = each.split('|')
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
  for(let each of Data.menuItems) {
    let [ , category, iconClass] = each.split('|')
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
    if (!media.source || media.elementType === 'video'){
      switch(media.provider){
      case 'vimeo':
        return `<iframe src="" data-src="https://player.vimeo.com/video/${media.id}" frameborder="0" allowfullscreen></iframe>`
      case 'youtube':
        return `<iframe src="" data-src="https://www.youtube.com/embed/${media.id}?ecver=1" frameborder="0" allowfullscreen></iframe>`
      }
    } else if (media.source && media.elementType === 'image') {
      return `<img src="" data-src="${media.source}">`
    }
    return '';
  });

Controller.handlerForNav = function() {
  $('nav').on('click', '.tab', function() {
    $('.tab').removeClass('tabActivated')
    $('article').hide();
    let attibute = this.getAttribute('data-type');
    $(`*[data-type="${attibute}"]`).fadeIn();
    $(`.tab[data-type="${attibute}"]`).addClass('tabActivated')
  });
  $('.tab:first-child').click();
};

Controller.handlerShowAndHide = function() {
  $('.show, .hide').on('click', function(event){
    event.preventDefault()
    let mediaContainer = $(this).parent().siblings('.media')
    let mediaElemet = mediaContainer.children().first()
    let mediaSource = mediaElemet.attr('data-src') || ''
    if (this.className === 'show') {
      mediaElemet.attr('src', mediaSource )
      mediaContainer.fadeIn()
      this.className = 'hide'
    } else if (this.className === 'hide') {
      mediaContainer.hide()
      this.className = 'show'
    }
  });
}
/** @param {Project[]} projects */
Controller.createRecentListOnDOM = function(projects) {
  for(let each of projects) {
    let cloned = $('aside ul li:first-child').clone()
    cloned.find('a').attr('href', each.link)
    cloned.find('a').html(each.name.substring(0, 14) + '...' )
    cloned.find('a').addClass(Controller.iconTypeClass(each.type))
    $('aside ul').append(cloned)
  }
  $('aside ul li:first-child').detach()
}
