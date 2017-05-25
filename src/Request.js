import $ from 'jquery';
import MD5 from 'md5-es';
const URL = "http://en.wikipedia.org/w/api.php?origin=*&action=query&generator=random&grnnamespace=0&prop=extracts|images|links&pllimit=5000&format=json";

const get = (f) =>
  fetch(URL)
    .then((response) => response.json())
    .then((json) => parseJson(json, f))

function parseJson(json, f) {
  const article = json.query.pages[Object.keys(json.query.pages)[0]];
  const body = $(article.extract).first().text();
  const image = getArticleImg(article);
  console.log(article);
  // TODO: 'can mean:''
  if (body === '' || body.indexOf('refer to:') > 0){
    console.log('no body')
    return get(f);
  }
  f({
    title: article.title,
    image: image,
    body: body
  });
}

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

export default get;
