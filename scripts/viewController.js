'use strict';

class ViewController {
}

/** 
 * This method will reach directly into the DOM and update aside List
 * @param {Project[]} projects */
ViewController.createRecentListOnDOM = function(projects) {
  for(let each of projects) {
    let cloned = $('aside ul li:first-child').clone()
    cloned.find('a').attr('href', '#' + each.getId() )
    cloned.find('a').attr('data-name', each.name)
    cloned.find('a').attr('data-type', each.type)
    cloned.find('a').addClass('asideLink')
    cloned.find('a').html(Controller.shorternName(each.name))
    cloned.addClass(Controller.iconTypeClass(each.type))
    $('aside ul').append(cloned)
  }
  $('aside ul li:first-child').detach()
}