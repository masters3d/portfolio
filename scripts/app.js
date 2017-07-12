'use strict'

let projects = (new Data()).projects;

projects.forEach(function(project){
  $('#articles').append(project.toHtml());
});