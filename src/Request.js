import $ from 'jquery';
import MD5 from 'md5-es';
const URL = "http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|images|links&pllimit=5000&format=json&callback=?";

// fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json").then(function(r){return r.json()}).then(function(data){
// const article = data.query.pages[Object.keys(data.query.pages)[0]];
// console.log(article.extract)
// })

function getArticleImg(article) {
  if (article.images && article.images[0].title) {
    // const fileName = "Killerwhales jumping.jpg"
    console.log(article.images[0]);
    const fileName = article.images[0].title.replace(/^File:/, '').replace(/\s/g,'_');
    const hash = MD5.hash(fileName);
    const char0 = hash[0];
    const char1 = hash[1];
    // Thumbnail
    // 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/1920px-Killerwhales_jumping.jpg'
    // TODO: Handle files not in /commons:
    //upload.wikimedia.org/wikipedia/en/6/61/Lord_of_the_Rings_Game_One.jpg
    return `https://upload.wikimedia.org/wikipedia/commons/${char0}/${char0}${char1}/${fileName}`;
  }
  return null;
}

const get = (f) =>
  $.getJSON(URL, (data) => {
    const article = data.query.pages[Object.keys(data.query.pages)[0]];
    const body = $(article.extract).first().text();
    const image = getArticleImg(article);
    console.log(article);
    // TODO: 'can mean:''
    if (body === '' || body.indexOf('refer to:') > 0){
      console.log('no body')
      get(f);
      return;
    }
    f({
      title: article.title,
      image: image,
      body: body
    });
  });

export default get;
