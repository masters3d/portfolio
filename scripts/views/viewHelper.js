'use strict';

class ViewHelper {
}

/**
 * This method will reach directly into the DOM and update aside List
 * @param {Project[]} projects */
ViewHelper.createRecentListOnDOM = function(projects) {
  for(let each of projects) {
    let cloned = $('aside ul li:first-child').clone()
    cloned.find('a').attr('href', '#' + each.getId() )
    cloned.find('a').attr('data-name', each.name)
    cloned.find('a').attr('data-type', each.type)
    cloned.find('a').addClass('asideLink')
    cloned.find('a').html(ViewManager.shorternName(each.name))
    cloned.addClass(ViewManager.iconTypeClass(each.type))
    $('aside ul').append(cloned)
  }
  $('aside ul li:first-child').detach()
}


/**
 * This method will reach directly into the DOM and create
 * the recent activity fetched from github.
 * These will be inserted into the home page
 * @param {Object[]} activities */
ViewHelper.createGithubActivityOnDOM = function(activities){
  let $ul = $(document.createElement('ul'))
  for(let each of activities) {
    let $li = $(document.createElement('li'))
    let dateCreated = `${each['created_at']}`
    let hours = ViewManager.howManyHoursAgo(dateCreated)
    let repoJsonURL = `${each['repo']['url']}`
    let repoName =  `${each['repo']['name']}`
    let type = `${each['type']}`
    $li.html(`${hours} hours ago. ${type} <a href="${repoJsonURL}">${repoName}</a>`)
    $ul.append($li)
  }
  let $homePage = $('article[data-type="hom"]')
  let $media = $(document.createElement('section'))
  $media.addClass('media')
  $media.html('<p>Github Activity</p>')
  $media.append($ul)
  $homePage.append($media)
}
