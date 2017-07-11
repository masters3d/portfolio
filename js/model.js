'use strict'

class Project {
  /** @param {string} name  
   *  @param {string} image 
   *  @param {string} type 
   *  @param {string} description  */
  constructor (name, image, type, description) {
    this.name = name
    this.image = image
    this.description = description
    this.type = type
  }
}
