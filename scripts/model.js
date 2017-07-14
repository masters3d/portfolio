/// <reference types="jquery" />
'use strict';

class Project {
  /** @param {string} name
   *  @param {string} type web | vid | app | art
   *  @param {string} link
   *  @param {string} media | HTML object as a string
   *  @param {string} description
   *  @param {string} date
   */
  constructor (type, name, link, media, description, date) {
    this.type = type
    this.name = name
    this.link = link.trim()
    this.media = media ? this.generateMediaHtmlString(type, media.trim()) :
      this.generateMediaHtmlString(type, link)
    this.description = description || this.generateRandomText()
    this.date = date || '2015-10-01'
  }
}

Project.prototype.getId = function() {
  return this.name.replace(/ /g,'-').toLowerCase()
}

class Data {
  constructor() {
    let projectsInfo = [
      `art,3D Sketches,
        http://community.foundry.com/profile/cheyo84,
        http://content.luxology.com/gallery/7faba61b214ef99f765daea6a422308e.jpg`,
      `art,All Vimeo Videos,https://vimeo.com/masters3d`,
      `vid,Honduras 2015 Highlights - Upon this Rock Ministries,youtube=waXta2PAjfc`,
      `vid,Guatemala 2014 Upon This Rock Ministries,youtube=VMkDSfq1ghg`,
      `vid,Team returns one year after Yolanda,youtube=hMHgUtxMiG8`,
      `vid,Thank you vid,youtube=64kGSkgOUjU`,
      `vid,Change Giving to Going | Hotes Foundation,youtube=8qETFdq6UN8`,
      `vid,Earthquake,youtube=16NcsqhRhzE`,
      `vid,A Haitian Price Turns One,youtube=fd5OF4I45ak`,
      `vid,Cool 3d After FX,vimeo=1962476`,
      `vid,TVida Vision,vimeo=1960049`,
      `vid,Slavador trip,vimeo=1924143`,
      `vid,WP Storage Structure,youtube=wRj1z21ITDI`,
      `vid,WP School Canopies,youtube=vOb_Xu74ras`,
      `vid,AKS Disaster Response Camp,youtube=1q_1wL522yA`,
      `vid,AKS Quonset Buildings,youtube=3Qz_OsdHruY`,
      `app,All Github Projects,https://github.com/masters3d?tab=repositories`,
      `app,BlogClient,https://github.com/masters3d/BlogClient/,
        https://user-images.githubusercontent.com/6539412/28151810-dea0b682-6751-11e7-8700-a17b41a4492b.gif`,
      `app,VirtualTourist,https://github.com/masters3d/VirtualTourist,
        https://cloud.githubusercontent.com/assets/6539412/19018530/da18a9f2-8819-11e6-8766-42ccdc0ea546.gif`,
      `app,OntheMap,https://github.com/masters3d/OnTheMap,
        https://cloud.githubusercontent.com/assets/6539412/19424719/5ce11b22-93e0-11e6-85bd-3e2ca49a45b9.png`,
      `app,BreakoutGame,https://github.com/masters3d/breakoutGame,
        https://camo.githubusercontent.com/555990b2d77f31959922c4ea545d6d2201aa238a/687474703a2f2f692e696d6775722e636f6d2f395233494a33312e676966`,
      `app,MemeCreator,https://github.com/masters3d/memeCreatorApp,
        https://cloud.githubusercontent.com/assets/6539412/19424696/262c5a4c-93e0-11e6-95a2-7a380e6644c7.png`,
      `app,VoiceRecorder,https://github.com/masters3d/recordVoiceApp,
        https://user-images.githubusercontent.com/6539412/28151962-c8f77dba-6752-11e7-8ba8-a8f031caa3fb.gif`,
      `app,JavaGUIProject,https://github.com/masters3d/JavaGUIProject,
        https://user-images.githubusercontent.com/6539412/28152784-11b0ec7c-6757-11e7-8dd2-b634b3e3bb74.gif`,
      `app,TextBasedJavaGame,https://github.com/masters3d/TextBasedJavaGame,
        https://user-images.githubusercontent.com/6539412/28152533-e62a4e32-6755-11e7-81b6-ef309edf99e5.gif`,
      `app,JavaGUITravelApp,https://github.com/masters3d/JavaGUITravelApp,
        https://cloud.githubusercontent.com/assets/6539412/14809215/613f446a-0b40-11e6-9cb1-4d1deb177f26.png`,
      `web,App Engine Wiki Web Server,https://github.com/masters3d/Appengine-Udacity-Blog-Project,
        http://cheyomasters3d.apppot.com/wiki`,
      `web,Blog Backend API with User Authentication,http://cheyomasters3d.apppot.com/blog.json,
        http://cheyomasters3d.appspot.com/blog`,
      `web,Emoji Slots Game,https://github.com/AlexithymiaStudios/alexi-slots,
        https://alexithymiastudios.github.io/alexi-slots/`,
      `web,BusMall Shopping App,https://github.com/masters3d/bus-mall,
        https://masters3d.github.io/bus-mall/`,
      `web,Pats Company Site,https://github.com/masters3d/pats_co,
        https://masters3d.github.io/pats_co/`,
      `web,About Me Game,https://github.com/masters3d/about_me,
        https://masters3d.github.io/about_me/requirement/index.html`,
      `web,Image to HTML Sample,https://github.com/masters3d/chocolate_pizza/,
        https://masters3d.github.io/chocolate_pizza/`,
    ]
    /** @type {Project[]} _projects */
    let _projects = []
    for(let each of projectsInfo) {
      let data = each.split(',')
      let type = data[0];
      let name = data[1]
      let link = data[2]
      let media = data[3] || ''
      let project = new Project(type, name, link, media, '', '')
      _projects.push(project)
    }
    this._projects = _projects;
  }
  get projects() {
    return this._projects
  }
}

Project.prototype.generateRandomText = function() {
  let text =`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo adhuc, quantum equidem intellego, causa non videtur fuisse mutandi nominis. Ut optime, secundum naturam affectum esse possit. Non quaeritur autem quid naturae tuae consentaneum sit, sed quid disciplinae. Duo Reges: constructio interrete. Ut id aliis narrare gestiant? Certe, nisi voluptatem tanti aestimaretis. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Nam de isto magna dissensio est. Age nunc isti doceant, vel tu potius quis enim ista melius? Non enim iam stirpis bonum quaeret, sed animalis. Tollenda est atque extrahenda radicitus. Partim cursu et peragratione laetantur, congregatione aliae coetum quodam modo civitatis imitantur;
            `
  return text;
}
/** @param {string} mediaCode
 *  @param {string} type
*/
Project.prototype.generateMediaHtmlString = function(type, mediaCode){
  if (type === 'vid') {
    let provider, code
    [provider, code] = (mediaCode.split('='))
    if ( provider === 'vimeo') {
      return `<iframe width="560" height="315" src="https://player.vimeo.com/video/${code}" frameborder="0" allowfullscreen></iframe>`
    } else if (provider === 'youtube') {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${code}?ecver=1" frameborder="0" allowfullscreen></iframe>`
    }
  }

  if (type === 'web') {
    return `<img src="${'http://lorempixel.com/320/320/' + '?random=' + (Math.random())}">`
  }

  if (type === 'app'){
    `<img max-width="560" src="${mediaCode}">`
  }

  return `<img src="${mediaCode}">`

}

Project.prototype.toHtml = function() {
  let template =
  `<article>
        <header>
          <h1>Title</h1>
          <div class="byline">
            By <address><a href="">Author Name</a></address>
            published <time pubdate datetime="2000-01-01">Publish Time</time>
          </div>
        </header>
        <section class="article-body"></section>
        <a href="#" class="read-on">Read on &rarr;</a>
      </article>
  `
  let $newProject = $('<div/>').html(template).contents().clone();
  $newProject.data('category', this.type);
  $newProject.find('address a').first().text(this.name);
  $newProject.find('address').find('a').attr('href', this.link);
  $newProject.find('h1').first().text(this.name);
  $newProject.find('.article-body').first().html(this.description);
  $newProject.find('.article-body').first().append(this.media)
  // Display the date as a relative number of 'days ago'
  const today = new Date()
  const publishedOn = new Date(this.date)
  const difference = today.getTime() - publishedOn.getTime()
  $newProject.find('time').html('abou t ' + parseInt(`${difference/60/60/24/1000}`) + ' days ago');
  $newProject.append('<hr>');
  return $newProject;
};
