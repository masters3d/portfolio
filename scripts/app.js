'use strict'

let data = new Data();

data.projects.forEach(function(project){
  $('#articles').append(project.toHtml());
});