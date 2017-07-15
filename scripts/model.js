/// <reference types="jquery" />
/// <reference types="handlebars" />
'use strict';

class Media {
  /** @param {string} source is the link for the source
   * @param {string} elementType |video|image|iframe|
   * @param {string} provider is the video provider for the source
   * @param {string} id is the id of the video or type of provider
   */
  constructor (source, elementType, id, provider) {
    this.source = source || ''
    this.elementType = elementType || ''
    this.id = id || ''
    this.provider = provider || ''
  }
}

/** @param {Media} media 
*/
Handlebars.registerHelper('mediaCreateHtml', function(media) {
  if (!media.source || media.elementType === 'video'){
    switch(media.provider){
    case 'vimeo':
      return `<iframe width="560" height="315" src="https://player.vimeo.com/video/${media.id}" frameborder="0" allowfullscreen></iframe>`
    case 'youtube':
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${media.id}?ecver=1" frameborder="0" allowfullscreen></iframe>`
    }
  } else if (media.source && media.elementType === 'image') {
    return `<img max-width="560" src="${media.source}">`
  }
  return '';
});

class Project {
  /** @param {string} name
   *  @param {string} type web | vid | app | art
   *  @param {string} link
   *  @param {string} media | HTML object as a string
   *  @param {string} description
   *  @param {string} date
   *  @param {string} daysAgo
   */
  constructor (type, name, link, media, description, date) {
    this.type = type
    this.name = name
    this.link = link.trim()
    this.media = media;
    this.description = description
    this.date = date
  }
}

Project.prototype.getId = function() {
  return this.name.replace(/ /g,'-').toLowerCase()
}

class Data { // eslint-disable-line
  /** @param {Object[]} jsonData */ 
  constructor(jsonData) {

    /** @type {Project[]} _projects */
    let _projects = []

    for(let each of jsonData) {
      // console.log(each.media)
      let temp = $('<div/>').html(each.media).children().first();
      // console.log(temp)
      let source = temp.attr('src')
      // console.log(source)
      let elementType = each.type === 'vid' ? 'video' : 'image'
      let provider = elementType === 'video' ? source.search('youtube') === -1 ? 'vimeo' : 'youtube' : ''
      let id = function() {
        if (elementType !== 'video') { return '' }
        if( provider === 'youtube') {
          return source.split('embed/')[1].split('?ecver')[0]
        } else {
          let mystring = source.split('video/')[1]
          return  mystring //= mystring.substring(0, mystring.length - 1);
        }
      }()
      let media = new Media(source,elementType,id,provider)
      let project = new Project(each.type, each.name, each.link, media, each.description, each.date)
      _projects.push(project)
    }
    this._projects = _projects;
    console.log(JSON.stringify(_projects))
  }

  get projects() {
    return this._projects
  }
}

// Display the date as a relative number of 'days ago'
Project.prototype.generateDaysAgo = function() {
  const today = new Date()
  const publishedOn = new Date(this.date)
  const difference = today.getTime() - publishedOn.getTime()
  return parseInt(`${difference/60/60/24/1000}`)
}

Project.prototype.toHtml = function() {
  let handlebarsTemplateString = jQuery('#handlebarsTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(this);
  return html;
};
