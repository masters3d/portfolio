'use strict'

class Project {
  /** @param {string} name
   *  @param {string} type web | vid | app | art
   *  @param {string} link
   *  @param {string} image
   *  @param {string} description
   *  @param {string} date
   */
  constructor (type, name, link, image, description, date) {
    this.name = name
    this.type = type
    this.link = link
    this.description = description || generateRandomText()
    this.image = image || 'http://lorempixel.com/400/400/'
    this.date = date || '2015-10-01'
  }
}

class Data {
  constructor() {
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
    /** @type {Project[]} _projects */
    let _projects = []
    for(let each of projectsInfo) {
      let data = each.split(',')
      let type = data[0];
      let name = data[1]
      let link = data[2]
      let project = new Project(type, name, link, '', '', '')
      _projects.push(project)
    }
    this._projects = _projects;
  }
  get projects() {
    return this._projects
  }
}

function generateRandomText() {
  let text =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ergo adhuc, quantum equidem intellego, causa non videtur fuisse mutandi nominis. Ut optime, secundum naturam affectum esse possit. Non quaeritur autem quid naturae tuae consentaneum sit, sed quid disciplinae. Duo Reges: constructio interrete. Ut id aliis narrare gestiant? Certe, nisi voluptatem tanti aestimaretis. Huius, Lyco, oratione locuples, rebus ipsis ielunior. Nam de isto magna dissensio est. Age nunc isti doceant, vel tu potius quis enim ista melius? Non enim iam stirpis bonum quaeret, sed animalis. Tollenda est atque extrahenda radicitus. Partim cursu et peragratione laetantur, congregatione aliae coetum quodam modo civitatis imitantur;
    `
  return text;
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
  let $newProject = $('<div/>').html(template).contents()
  $newProject.data('category', this.type);
  $newProject.find('address a').first().text(this.name);
  $newProject.find('address').find('a').attr('href', this.link);
  $newProject.find('h1').first().text(this.name);
  $newProject.find('.article-body').first().html(this.description);
  $newProject.find('.article-body').first().append(`<img src="${this.image + '?random=' + this.name}">`)
  // Display the date as a relative number of 'days ago'
  const today = new Date()
  const publishedOn = new Date(this.date)
  $newProject.find('time').html('about ' + parseInt((today - publishedOn)/60/60/24/1000) + ' days ago');
  $newProject.append('<hr>');
  return $newProject;
};
