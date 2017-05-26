import React from 'react';
import './Article.css';

const Article = ({article}) => {
  const { title, url, body, image } = article;
  return (
    <article>
      <h1><a href={url}>{title}</a></h1>
      <p>{body}</p>
      { image &&
        <img src={image} alt={title} onError={(e) => e.target.style.display='none'} />
      }
    </article>
  )
}

export default Article;
