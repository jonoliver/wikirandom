import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';

// fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json").then(function(r){return r.json()}).then(function(data){
// const article = data.query.pages[Object.keys(data.query.pages)[0]];
// console.log(article.extract)
// })

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  componentDidMount(){
    this.getRandomArticle();
  }

  getRandomArticle(){
    $.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|images|links&pllimit=5000&format=json&callback=?", (data) => {
        const article = data.query.pages[Object.keys(data.query.pages)[0]];
        const body = $(article.extract).first().text();
        // console.log(data);
        // console.log(article);
        console.log(article.title)
        console.log(article.images[0])
        // TODO: 'can mean:''
        if (body === '' || body.indexOf('refer to:') > 0){
          console.log('no body')
          this.getRandomArticle();
          return;
        }
        this.setState({
          title: article.title,
          body: body
        });
    });
  }

  render() {
    const { title, body } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WikiRandom</h2>
        </div>
        <button onClick={()=>this.getRandomArticle()}>Random article</button>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default App;
