/// <reference types="jquery" />
'use strict';

// Point of Entry of the app
// Load JSON and popluate the projects data
$(function() {
  $.getJSON( 'data/projects.json', setup);
})

/** @param {Object[]} jsonProjectObjects */ 
function setup(jsonProjectObjects) {
  let projects = (new Data(jsonProjectObjects)).projects
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
