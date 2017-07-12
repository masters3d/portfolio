'use strict'

class Project {
  /** @param {string} name
   *  @param {string} type web | vid | app | art
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

let projectsInfo = [
  'art,3D Sketches,http://community.thefoundry.co.uk/community/profile.aspx?name=cheyo84',
  'vid,Honduras 2015 Highlights - Upon this Rock Ministries,https://www.youtube.com/watch?v=waXta2PAjfc',
  'vid,Guatemala 2014 Upon This Rock Ministries,https://www.youtube.com/watch?v=VMkDSfq1ghg',
  'vid,Team returns one year after Yolanda,https://www.youtube.com/watch?v=hMHgUtxMiG8',
  'vid,Thank you vid,https://www.youtube.com/watch?v=64kGSkgOUjU',
  'vid,Change Giving to Going | Hotes Foundation,https://www.youtube.com/watch?v=8qETFdq6UN8',
  'vid,Earthquake,https://www.youtube.com/watch?v=16NcsqhRhzE',
  'vid,THE HAITIAN PRINCE TURNS 1,https://www.youtube.com/watch?v=fd5OF4I45ak',
  'vid,Vimeo Page One vid Projects,https://vimeo.com/masters3d/vids/page:1/sort:date',
  'vid,Vimeo Page Two vid Projects,https://vimeo.com/masters3d/vids/page:2/sort:date',
  'vid,WP Storage Structure,https://www.youtube.com/watch?v=wRj1z21ITDI',
  'vid,WP School Canopies,https://www.youtube.com/watch?v=vOb_Xu74ras',
  'vid,AKS Disaster Response Camp,https://www.youtube.com/watch?v=1q_1wL522yA',
  'vid,AKS Quonset Buildings,https://www.youtube.com/watch?v=3Qz_OsdHruY',
  'app,All Github Projects,https://github.com/masters3d?tab=repositories',
  'app,BlogClient,https://github.com/masters3d/BlogClient/',
  'app,VirtualTourist,https://github.com/masters3d/VirtualTourist',
  'app,OntheMap,https://github.com/masters3d/OnTheMap',
  'app,BreakoutGame,https://github.com/masters3d/breakoutGame',
  'app,MemeCreator,https://github.com/masters3d/memeCreatorApp',
  'app,VoiceRecorder,https://github.com/masters3d/recordVoiceApp',
  'app,App Engine Source Code,https://github.com/masters3d/Appengine-Udacity-Blog-Project',
  'app,Custom WIKI Web Server,http://cheyomasters3d.apppot.com/wiki',
  'app,Blog Backend API with User Authentication,http://cheyomasters3d.apppot.com/blog.json',
  'app,JavaGUIProject,https://github.com/masters3d/JavaGUIProject',
  'app,TextBasedJavaGame,https://github.com/masters3d/TextBasedJavaGame',
  'app,JavaGUITravelApp,https://github.com/masters3d/JavaGUITravelApp',
  'web,Emoji Slots Game,https://github.com/AlexithymiaStudios/alexi-slots',
  'web,BusMall Shopping App,https://github.com/masters3d/bus-mall',
  'web,Pats Company Site,https://github.com/masters3d/pats_co',
  'web,About Me Game,https://github.com/masters3d/about_me',
  'web,Image to HTML Sample,https://github.com/masters3d/chocolate_pizza/',
]

  //TODO: Add more web projects and artisting ones
