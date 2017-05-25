import React, { Component } from 'react';
import Article from '../Article';
import get from '../Request'
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount(){
    this.getRandomArticle();
  }

  getRandomArticle(){
    get((response) => this.setState({ articles: response }));
  }

  render() {
    const { articles } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WikiRandom</h2>
        </div>
        <button onClick={()=>this.getRandomArticle()}>Random article</button>
        <main>
        { articles.map(article =>
          <Article key={article.pageid} article={article} />
        )}
        </main>
      </div>
    );
  }
}

export default App;
