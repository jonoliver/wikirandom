import React from 'react';
import './Article.css';

const Article = ({article}) => {
  const { title, url, body, image } = article;
  return (
    <article>
      <h1><a href={url}>{title}</a></h1>
      <p>{body}</p>
      <img src={image} alt={image} />
    </article>
  )
}

export default Article;
