/// <reference types="jquery" />
'use strict';

// Load JSON and popluate the projects data
$.getJSON( 'data.json', function( response ) {
  let projects = (new Data(response)).projects
  //Add all the articles to the page
  projects.forEach(function(project){
    let html = project.toHtml()
    $('#articles').append(html);
  });
});