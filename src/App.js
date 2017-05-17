import React, { Component } from 'react';
import get from './Request.js'
import logo from './logo.svg';
import './App.css';

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
    get((response) => {
      this.setState({
        title: response.title,
        body: response.body
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
