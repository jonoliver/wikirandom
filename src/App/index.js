import React, { Component } from 'react';
import Article from '../Article';
import get from '../Request'
import logo from '../wikipedia.png';
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
    this.getRandomArticles();
  }

  getRandomArticles(){
    this.setState({loading: true});
    const { articles } = this.state
    get().then((response) => {
      this.setState({ articles: articles.concat(response), loading: false });
    });
  }

  render() {
    const { articles, loading } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WikiRandom</h2>
        </div>
        <main>
        {
          articles.map(article => <Article key={article.pageid} article={article} />)
        }
        {
          loading ?
            <div className="loader">Loading...</div> :
            <button className='fetch-articles' onClick={()=>
              this.getRandomArticles()}>More Articles
            </button>
        }
        </main>
      </div>
    );
  }
}

export default App;
