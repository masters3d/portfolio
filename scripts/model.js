/// <reference types="jquery" />
/// <reference types="handlebars" />
'use strict';

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
    this.media = media ? this.generateMediaHtmlString(type, media.trim()) :
      this.generateMediaHtmlString(type, link)
    this.description = description || this.generateRandomText()
    this.date = date || '2015-10-01'
    this.daysAgo = this.generateDaysAgo();
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
    this._projects = _projects;
  }

  get projects() {
    return this._projects
  }
}

Project.prototype.generateRandomText = function() {
  let text =`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo adhuc, quantum equidem intellego, causa non videtur fuisse mutandi nominis. Ut optime, secundum naturam affectum esse possit. Non quaeritur autem quid naturae tuae consentaneum sit, sed quid disciplinae. Duo Reges: constructio interrete. Ut id aliis narrare gestiant? Certe, nisi voluptatem tanti aestimaretis. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Nam de isto magna dissensio est. Age nunc isti doceant, vel tu potius quis enim ista melius? Non enim iam stirpis bonum quaeret, sed animalis. Tollenda est atque extrahenda radicitus. Partim cursu et peragratione laetantur, congregatione aliae coetum quodam modo civitatis imitantur;
            `
  return text;
}
/** @param {string} mediaCode
 *  @param {string} type
*/
Project.prototype.generateMediaHtmlString = function(type, mediaCode){
  if (type === 'vid') {
    let provider, code
    [provider, code] = (mediaCode.split('='))
    if ( provider === 'vimeo') {
      return `<iframe width="560" height="315" src="https://player.vimeo.com/video/${code}" frameborder="0" allowfullscreen></iframe>`
    } else if (provider === 'youtube') {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${code}?ecver=1" frameborder="0" allowfullscreen></iframe>`
    }
  }

  if (type === 'web') {
    return `<img src="${'http://lorempixel.com/320/320/' + '?random=' + (Math.random())}">`
  }

  if (type === 'app'){
    `<img max-width="560" src="${mediaCode}">`
  }

  return `<img src="${mediaCode}">`

}
// Display the date as a relative number of 'days ago'
Project.prototype.generateDaysAgo = function() {
  const today = new Date()
  const publishedOn = new Date(this.date)
  const difference = today.getTime() - publishedOn.getTime()
  return 'about ' + parseInt(`${difference/60/60/24/1000}`) + ' days ago';
}

Project.prototype.toHtml = function() {
  let handlebarsTemplateString = jQuery('#handlebarsTemplate').html();
  let compiled = Handlebars.compile(handlebarsTemplateString);
  let html = compiled(this);
  return html;
};
