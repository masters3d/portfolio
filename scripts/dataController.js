'use strict';

(function(module){
  class DataController {
  }

  DataController.load = loadLocalStorage
  DataController.save = saveLocalStorage

  function loadLocalStorage() {
    let rawData = localStorage.getItem('masters3d');
    if (rawData !== null) {
      let data = JSON.parse(rawData)
      return {success:true, data}
    } else {
      return {success:false, data:{}}
    }
  }

  /** @param {Object} data */
  function saveLocalStorage(data) {
    localStorage.setItem('masters3d', JSON.stringify(data))
  }

  module.DataController = DataController
})(window)