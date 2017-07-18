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
  return this.name.replace(/ /g,'-').toLowerCase()
}

class Data { // eslint-disable-line
  /** @param {Object[]} jsonData */ 
  constructor(jsonData) {

    /** @type {Project[]} _projects */
    let _projects = []

    for(let each of jsonData) {
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

Data.menuItems = [
  'Home|HOM|icon-home',
  'About|IAM|icon-trophy',
  'Technical|WEB|icon-codepen',
  'Producer|VID|icon-video-camera',
  'Creative|PRO|icon-mug',
  'Developer|APP|icon-rocket',
]

Project.prototype.toHtml = function() {
  let handlebarsTemplateString = jQuery('#handlebarsTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(this);
  return html;
};
