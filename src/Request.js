import $ from 'jquery';
import getArticleImg from './image'

const NUM_PAGES = 10;

const params = $.param({
  origin: "*",
  action: "query",
  generator: "random",
  grnlimit: NUM_PAGES,
  exlimit: "max",
  exintro: "",
  grnnamespace: "0",
  prop: "extracts|images|pageimages|pageterms|info",
  inprop: "url",
  pllimit: "5000",
  format: "json",
  formatversion: "2",
});

const URL = `http://en.wikipedia.org/w/api.php?${params}`;

const get = () =>
  fetch(URL)
    .then((response) => response.json())
    .then(parseJson);

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

function isEmpty(article) {
  const { body } = article;
  if (body === '' || body.indexOf('refer to:') > 0){
    console.log('no body')
    return false;
  }
  return true;
}

export default get;
