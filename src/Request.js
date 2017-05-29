import $ from 'jquery';
import getArticleImg from './image'

const DEFAULT_URL = buildUrl();

const get = (url = DEFAULT_URL) =>
  fetch(url)
    .then((response) => response.json())
    .then(parseJson);

function buildUrl(searchTerm) {
  const numPages = 10;
  const baseUrl = "http://en.wikipedia.org/w/api.php?";
  const baseParams = {
    origin: "*",
    action: "query",
    exlimit: "max",
    exintro: "",
    grnnamespace: "0",
    prop: "extracts|images|pageimages|pageterms|links|info",
    inprop: "url",
    pllimit: "5000",
    format: "json",
    formatversion: "2",
  }
  const randomParams = {
    generator: "random",
    grnlimit: numPages
  }
  const searchParams = { titles: searchTerm }
  const additionalParams = searchTerm ? searchParams : randomParams;
  const finalParams = $.param($.extend(baseParams, additionalParams));
  return `${baseUrl}${finalParams}`;
}

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
  const link = getRandomLink(page.links);
  return {
    pageid: page.pageid,
    title: page.title,
    url: page.fullurl,
    image: image,
    body: body,
    nextLink: link
  }
}

function getRandomLink(links = []) {
  links = links.map((link) => link.title);
  return links[Math.floor(Math.random()*links.length)];
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
