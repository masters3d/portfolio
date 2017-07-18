/// <reference types="jquery" />
'use strict';

// Point of Entry of the app
// Load JSON and popluate the projects data
$(function() {
  if (Data.load().success){
    setup(Data.load().projects)
  } else {
    $.getJSON('data/projects.json', setupAndSave)
  }
})

/** @param {Object[]} jsonObjs */ 
function setupAndSave(jsonObjs) {
  setup(jsonObjs)
  Data.save(jsonObjs)
}

/** @param {Object[]} jsonObjs */ 
function setup(jsonObjs) {
  let projects = (new Data(jsonObjs)).projects
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