import React, { Component } from 'react';
import Article from '../Article';
import get from '../Request.js'
import logo from '../logo.svg';
import './index.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      article: {}
    }
  }

  componentDidMount(){
    this.getRandomArticle();
  }

  getRandomArticle(){
    get((response) => this.setState({ article: response }));
  }

  render() {
    const { article } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WikiRandom</h2>
        </div>
        <button onClick={()=>this.getRandomArticle()}>Random article</button>
        <Article article={article} />
      </div>
    );
  }
}

export default App;
