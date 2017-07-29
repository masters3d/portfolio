'use strict';

class ViewHelper {
}

/**
 * This method will reach directly into the DOM and update aside List
 * @param {Project[]} projects */
ViewHelper.createRecentListOnDOM = function(projects) {
  $('aside ul li:first-child').show()
  $('.asideLink').remove()
  for(let each of projects) {
    let cloned = $('aside ul li:first-child').clone()
    cloned.find('a').attr('href', '#' + each.getId() )
    cloned.find('a').attr('data-name', each.name)
    cloned.find('a').attr('data-type', each.type)
    cloned.find('a').addClass('asideLink')
    cloned.find('a').html(ViewManager.shorternString(each.name))
    cloned.addClass(ViewManager.iconTypeClass(each.type))
    $('aside ul').append(cloned)
  }
  $('aside ul li:first-child').hide()
}

/**
 * This method will reach directly into the DOM and create
 * bio based on github on the about page.
 * @param {Object[]} githubUserObj */
ViewHelper.createGithubBioOnDOM = function(githubUserObj){
  //Clearing before adding
  $('.gitHubAbout').remove()
  let $div = $(document.createElement('div'))
  $div.addClass('gitHubAbout')
  let $p = $(document.createElement('p'))
  let $img = $(document.createElement('img'))
  let location = `${githubUserObj['location']}`
  let avatar_url = `${githubUserObj['avatar_url']}`
  let name = `${githubUserObj['name']}`
  $div.append($img.clone().attr('src', avatar_url))
  $div.append($p.clone().html(name))
  $div.append($p.clone().html(location))
  let $about = $('article[data-type="iam"]')
  $about.append($div)
}
