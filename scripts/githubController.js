
'use strict';

/** @type {Object} */
var ajaxPasswords = ajaxPasswords || { github: ''} // eslint-disable-line no-var

Controller.getGithubRecentActivity = function(processDataFunc) {
  let headers = ajaxPasswords.github ? {Authorization: `token ${ajaxPasswords.github}`} : {}
  let url = `https://api.github.com/users/masters3d/events`
  $.ajax({url, headers}).then(function(data){
    processDataFunc(data)
  }).catch(function(error) {
    console.error(error)
  })
}