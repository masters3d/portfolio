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
    } else if (media.source && media.elementType === 'article' && media.provider === 'medium') {
      className = 'media-post-medium'
      toReturn = toReturn = `<p>${media.source}</p>`
    }
    return `<section class="media ${className}">${toReturn}</section>`;
  });

Controller.handlerForNav = function() {
  let firstTab = $('.tab:first-child')
  $('nav').on('click', '.tab', function(event) {
    event.preventDefault()
    $('.tab').removeClass('tabActivated')
    $('article').hide();
    let attibute = this.getAttribute('data-type');
    $(`*[data-type="${attibute}"]`).fadeIn();
    $(`.tab[data-type="${attibute}"]`).addClass('tabActivated')
    if (attibute === 'hom' || attibute === 'iam') {
      $('aside a').first().hide()
    } else {
      $('aside a').first().show()
    }
  });
  firstTab.click();
};

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


/** @param {Project[]} projects */
Controller.createRecentListOnDOM = function(projects) {
  for(let each of projects) {
    let cloned = $('aside ul li:first-child').clone()
    cloned.find('a').attr('href', '#' + each.getId() )
    cloned.find('a').attr('data-name', each.name)
    cloned.find('a').attr('data-type', each.type)
    cloned.find('a').addClass('asideLink')
    cloned.find('a').html(Controller.shorternName(each.name))
    cloned.addClass(Controller.iconTypeClass(each.type))
    $('aside ul').append(cloned)
  }
  $('aside ul li:first-child').detach()
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
  $('.asideLink').on('click', function(event){
    event.preventDefault()
    let link = $(this)
    let dataType = link.attr('data-type') || ''
    let anchor = (link.attr('href') || '#')
    $(`.tab[data-type="${dataType}"]`).first().click()
    let showHide = $(`${anchor}`).children('section').children('a').first()
    showHide.click()
    window.location.href = anchor;
  })
}
/** @param {Data} data */
Controller.updateCacheAgeOnFooter = function(data) {
  let seconds = `${data.howOldIsCacheInMiliSeconds()/1000}`
  $('footer p').html(`Cached ${parseInt(seconds)} Seconds ago`)
}

/** @param {JQuery<HTMLElement>} parent */
Controller.getBlogPostLinksAndInsert = function(parent) {
  const url = 'https://cors-anywhere.herokuapp.com/https://tech.masters3d.com/feed'
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'xml',
    success: function(xml){
      /** @param {string} input */
      let cleaningCDATA = (input) => {return input.replace('<![CDATA[', '').replace(']]>', '')}

      let div = $(document.createElement('div'))
      let items = $(xml).find('item')
      items.each( function(){
        let element = $(this)
        let contents = div.clone().html(cleaningCDATA(element.children().last().text()))
        let title = cleaningCDATA(element.find('title').first().text())
        let link = cleaningCDATA(element.find('link').first().text())

        let a = $(document.createElement('a'))
        a.attr('href',link)
        a.text(title)
        div.append(a)
      })
      parent.append(div)
    }
  })
}