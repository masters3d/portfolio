/// <reference types="jquery" />
'use strict';

let projects = (new Data()).projects;

projects.forEach(function(project){
  let html = project.toHtml()
  $('#articles').append(html);
});


