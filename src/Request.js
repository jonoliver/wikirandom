import $ from 'jquery';
import MD5 from 'md5-es';

const NUM_PAGES = 10;

const params = $.param({
  origin: "*",
  action: "query",
  generator: "random",
  grnlimit: NUM_PAGES,
  exlimit: "max",
  exintro: "",
  grnnamespace: "0",
  prop: "extracts|images|pageimages|links|info",
  inprop: "url",
  pllimit: "5000",
  format: "json",
});

const URL = `http://en.wikipedia.org/w/api.php?${params}`;

const get = (callback) =>
  fetch(URL)
    .then((response) => response.json())
    .then(parseJson)
    .then(callback);

function parseJson(json) {
  const { pages } = json.query;
  const keys = Object.keys(pages);
  const articles = keys
    .map((key) => parseArticle(pages[key]))
    .filter(isEmpty);
  return articles;
}

function parseArticle(page){
  const body = $(page.extract).text();
  const image = getArticleImg(page);
  return {
    pageid: page.pageid,
    title: page.title,
    url: page.fullurl,
    image: image,
    body: body
  }
}

function getArticleImg(article) {
  if (article.images && article.images[0].title) {
    // const fileName = "Killerwhales jumping.jpg"
    // console.log(article.images[0]);
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

function isEmpty(article) {
  const { body } = article;
  if (body === '' || body.indexOf('refer to:') > 0){
    console.log('no body')
    return false;
  }
  return true;
}

export default get;
