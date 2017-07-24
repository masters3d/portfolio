/// <reference types="jquery" />
/// <reference types="xml2json"/>
'use strict';

// Point of Entry of the app
// Load JSON and popluate the projects data
$(function() {
  if (DataController.load().success){
    let data = new Data(DataController.load().data)
    setInterval(Controller.updateCacheAgeOnFooter, 1000, data)
    if (data.isStale()) {
      $.getJSON('data/projects.json', getBlogPosts)
    } else {
      setup(data)
    }
  } else {
    $.getJSON('data/projects.json', getBlogPosts)
  }
})

/** @param {Object} rawData */
function getBlogPosts(rawData) {
  $.get('data/medium.json', function(data) {
    rawData.projects = rawData.projects.concat(data)
    setupAndSave(rawData)
  }).catch(function(request){
    console.error(request)
  })
}

/** @param {Object} rawData */
function setupAndSave(rawData) {
  setup(rawData)
  rawData.updated = (new Date()).toJSON()
  DataController.save(rawData)
}

/** @param {Object} rawData */
function setup(rawData) {
  let data = new Data(rawData)
  let projects = data.projects
  //Add all the articles to the page
  for (const project of projects){
    let html = project.toHtml()
    $('#articles').append(html);
  }
  // Toggles time shows as days since today
  Controller.timeHoverRegister();
  // Adds the game menu to header
  $('header').first().append(Controller.createMenuHtml())

  // Aside generation
  Controller.createRecentListOnDOM(projects)

  // Handlers
  Controller.handlerForNav()
  Controller.handlerShowAndHide()
  Controller.handlerShowAndHideAll()
  Controller.handlerRecentListShowAllName()
  Controller.handlerRecentListTakeMeToTab()

  // hiding all the media sections
  $('.media').hide()
}
