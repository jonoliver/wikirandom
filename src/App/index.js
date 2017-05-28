import React, { Component } from 'react';
import Article from '../Article';
import get from '../Request'
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: true
    }
  }

  componentDidMount(){
    this.getRandomArticle();
  }

  getRandomArticle(){
    this.setState({loading: true});
    get((response) => this.setState({ articles: response, loading: false }));
  }

  render() {
    const { articles, loading } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WikiRandom</h2>
        </div>
        <button id='fetch_articles' onClick={()=>this.getRandomArticle()}>Fetch me some articles!</button>
        <main>
        {
          loading ?
          <div className="loader">Loading...</div> :
          articles.map(article =>
            <Article key={article.pageid} article={article} />
        )}
        </main>
      </div>
    );
  }
}

export default App;
