import React from 'react';
import { Component } from 'react';
import './Article.css';

class Article extends Component {
  constructor(props){
    super(props);
    this.state = {
      article: props.article,
      backupImgAttempted: false
    };
    this.swapSrc = this.swapSrc.bind(this);
  }

  swapSrc(e) {
    if (this.state.backupImgAttempted){
      e.target.style.display = 'none';
    }
    else {
      const src = e.target.src;
      e.target.src = src.replace('/commons/', '/en/');
      this.setState({backupImgAttempted: true});
    }
  }

  render(){
    const { title, url, body, image } = this.state.article;
    return(
      <article>
        <h1><a href={url}>{title}</a></h1>
        <p>{body}</p>
        { image &&
          <img src={image} alt={title} onError={this.swapSrc} />
        }
      </article>
    )
  }
}

export default Article;
