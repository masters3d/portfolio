/// <reference types="jquery" />
'use strict';

let projects = (new Data()).projects;

//Add all the articles to the page
projects.forEach(function(project){
  let html = project.toHtml()
  $('#articles').append(html);
});


