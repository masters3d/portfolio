/// <reference types="jquery" />
/// <reference types="xml2json"/>
'use strict';

// Point of Entry of the app
// Load JSON and popluate the projects data
$(function() {
  if (DataController.load().success){
    let data = new Data(DataController.load().data)
    setInterval(ViewManager.updateCacheAgeOnFooter, 1000, data)
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
  ViewManager.getBlogPostsAndCallBack(
    /** @param {Object} data */
    function(data) {
      rawData.projects = rawData.projects.concat(data)
      setupAndSave(rawData)
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
  ViewManager.timeHoverRegister();
  // Adds the game menu to header
  $('header').first().append(ViewManager.createMenuHtml())

  // Aside generation
  ViewHelper.createRecentListOnDOM(projects)

  // Handlers
  ViewManager.handlerShowAndHide()
  ViewManager.handlerShowAndHideAll()
  ViewManager.handlerRecentListShowAllName()
  ViewManager.handlerRecentListTakeMeToTab()

  // Other AJAX Calls after site is loaded
  NetworkController.getGithubRecentActivity(
    ViewHelper.createGithubActivityOnDOM
  )
  // Clicks the home and repaces link with slash
  ViewManager.firstTabAsHomeInit()
}// End of Setup