import $ from 'jquery';
import getArticleImg from './image'

const get = (searchTerm) =>
  fetch(buildUrl(searchTerm))
    .then((response) => response.json())
    .then(parseJson);

function buildUrl(searchTerm) {
  const numPages = 1;
  const baseUrl = "http://en.wikipedia.org/w/api.php?";
  const baseParams = {
    origin: "*",
    action: "query",
    exlimit: "max",
    exintro: "",
    prop: "extracts|images|pageimages|pageterms|links|info",
    inprop: "url",
    pllimit: "5000",
    format: "json",
    formatversion: "2",
  }
  const randomParams = {
    generator: "random",
    grnlimit: numPages,
    grnnamespace: "0"
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
  const { pageid , title } = page;
  const url = page.fullurl;
  const body = $(page.extract).text();
  const image = getArticleImg(page);
  const nextLink = getRandomLink(page.links);
  return { pageid, title, image, body, url, nextLink }
}

function getRandomLink(links = []) {
  // TODO: handle no body content
  // TODO: handle no links
  // TODO: filter duplicate page ids
  // TODO: filter out prefixes:
  // Wikipedia:
  // User:
  // Category:
  // Portal:
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
