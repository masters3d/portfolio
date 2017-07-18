/// <reference types="jquery" />
'use strict';

// Point of Entry of the app
// Load JSON and popluate the projects data
$(function() {
  if (Data.load().success){
    let data = new Data(Data.load().data)
    if (data.isStale()) {
      $.getJSON('data/projects.json', setupAndSave)
    } else {
      setup(data)
    }
  } else {
    $.getJSON('data/projects.json', setupAndSave)
  }
})

/** @param {Object} rawData */ 
function setupAndSave(rawData) {
  setup(rawData)
  rawData.updated = (new Date()).toJSON()
  Data.save(rawData)
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

  // Handlers
  Controller.handlerForNav()
  Controller.handlerShowAndHide()

  // hiding all the media sections
  $('.media').hide()
}