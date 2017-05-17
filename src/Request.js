import $ from 'jquery';

const URL = "http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|images|links&pllimit=5000&format=json&callback=?";

// fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json").then(function(r){return r.json()}).then(function(data){
// const article = data.query.pages[Object.keys(data.query.pages)[0]];
// console.log(article.extract)
// })

const get = (f) =>
  $.getJSON(URL, (data) => {
      const article = data.query.pages[Object.keys(data.query.pages)[0]];
      const body = $(article.extract).first().text();
      // console.log(data);
      // console.log(article);
      // console.log(article.title)
      // console.log(article.images[0])
      // TODO: 'can mean:''
      if (body === '' || body.indexOf('refer to:') > 0){
        console.log('no body')
        get(f);
        return;
      }
      f({
        title: article.title,
        body: body
      });
  });

export default get;
