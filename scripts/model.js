/// <reference types="jquery" />
/// <reference types="handlebars" />
'use strict';

class Media { // eslint-disable-line
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

class Project {
  /** @param {string} name
   *  @param {string} type WEB | VID | APP | ART | PMO | TECH
   *  @param {string} link
   *  @param {Media} media | HTML object as a string
   *  @param {string} description
   *  @param {string} date
   *  @param {string} daysAgo
   */
  constructor (type, name, link, media, description, date) {
    this.type = type.toLowerCase()
    this.name = name
    this.link = link
    this.media = media;
    this.description = description
    this.date = date
  }
}

Project.prototype.getId = function() {
  return this.name.replace(/(")|(`)|( )|(\|)/g ,'-').toLowerCase()
}

class Data { // eslint-disable-line
  /** @param {Object} jsonData */
  constructor(jsonData) {
    /** @type {Date} updated */
    this.updated = new Date(jsonData.updated)
    /** @type {Project[]} _projects */
    let _projects = []
    for(let each of jsonData.projects) {
      let project = new Project(each.type, each.name, each.link, each.media, each.description, each.date)
      _projects.push(project)
    }
    this._projects = _projects.sort(function(a, b){
      let dateA = new Date(a.date).getTime()
      let dateB = new Date(b.date).getTime()
      return (dateA < dateB) ? 1 : -1
    });
  }

  get projects() {
    return this._projects
  }
}

Data.prototype.howOldIsCacheInMiliSeconds = function() {
  return (new Date).getTime() - this.updated.getTime()
}

Data.prototype.isStale = function() {
  const minutes = 15
  const interval = minutes * 60 * 100
  let current = (new Date).getTime()
  let last = this.updated.getTime()
  let difference = current - last
  return (difference > interval)
}

Data.prototype.toJSON = function() {
  let updated = this.updated
  let projects = this.projects
  return JSON.stringify({updated, projects })
}

Data.menuItems = {
  hom : {title: 'home', icon : 'icon-home' },
  iam : {title: 'about', icon : 'icon-trophy' },
  web : {title: 'technical', icon : 'icon-codepen'},
  pro : {title: 'creative', icon : 'icon-mug'},
  vid : {title: 'producer', icon : 'icon-video-camera'},
  app : {title: 'developer', icon : 'icon-rocket'},
}

Project.prototype.toHtml = function() {
  let handlebarsTemplateString = jQuery('#handlebarsTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(this).replace('id="#"', `id="${this.getId()}"`);
  return html;
};
