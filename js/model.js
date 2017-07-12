'use strict'

class Project {
  /** @param {string} name
   *  @param {string} type web | video | apps | art
   *  @param {string} link
   *  @param {string} image
   *  @param {string} description
   */
  constructor (name, link, type, description, image) {
    this.name = name
    this.type = type
    this.link = link
    this.description = description
    this.image = image

  }
}

let projectsInfo =
  ['3D Sketches,art,http://community.thefoundry.co.uk/community/profile.aspx?name=cheyo84',
    'Honduras 2015 Highlights - Upon this Rock Ministries,video,https://www.youtube.com/watch?v=waXta2PAjfc',
    'Guatemala 2014 Upon This Rock Ministries,video,https://www.youtube.com/watch?v=VMkDSfq1ghg',
    'Team returns one year after Yolanda,video,https://www.youtube.com/watch?v=hMHgUtxMiG8',
    'Thank you video,video,https://www.youtube.com/watch?v=64kGSkgOUjU',
    'Change Giving to Going | Hotes Foundation,video,https://www.youtube.com/watch?v=8qETFdq6UN8',
    'Earthquake,video,https://www.youtube.com/watch?v=16NcsqhRhzE',
    'THE HAITIAN PRINCE TURNS 1,video,https://www.youtube.com/watch?v=fd5OF4I45ak',
    'Vimeo Page One Video Projects,video,https://vimeo.com/masters3d/videos/page:1/sort:date',
    'Vimeo Page Two Video Projects,video,https://vimeo.com/masters3d/videos/page:2/sort:date',
    'WP Storage Structure,video,https://www.youtube.com/watch?v=wRj1z21ITDI',
    'WP School Canopies,video,https://www.youtube.com/watch?v=vOb_Xu74ras',
    'AKS Disaster Response Camp,video,https://www.youtube.com/watch?v=1q_1wL522yA',
    'AKS Quonset Buildings,video,https://www.youtube.com/watch?v=3Qz_OsdHruY',
    'All Github Projects,apps,https://github.com/masters3d?tab=repositories',
    'BlogClient,apps,https://github.com/masters3d/BlogClient/',
    'VirtualTourist,apps,https://github.com/masters3d/VirtualTourist',
    'OntheMap,apps,https://github.com/masters3d/OnTheMap',
    'BreakoutGame,apps,https://github.com/masters3d/breakoutGame',
    'MemeCreator,apps,https://github.com/masters3d/memeCreatorApp',
    'VoiceRecorder,apps,https://github.com/masters3d/recordVoiceApp',
    'App Engine Source Code,apps,https://github.com/masters3d/Appengine-Udacity-Blog-Project',
    'Custom WIKI Web Server,apps,http://cheyomasters3d.appspot.com/wiki',
    'Blog Backend API with User Authentication,apps,http://cheyomasters3d.appspot.com/blog.json',
    'JavaGUIProject,apps,https://github.com/masters3d/JavaGUIProject',
    'TextBasedJavaGame,apps,https://github.com/masters3d/TextBasedJavaGame',
    'JavaGUITravelApp,apps,https://github.com/masters3d/JavaGUITravelApp'
  ]

  //TODO: Add more web projects and artisting ones
