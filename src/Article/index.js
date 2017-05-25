import React from 'react';
import './Article.css';

const Article = ({article}) => {
  const { title, body, image } = article;
  return (
    <article>
      <h1>{title}</h1>
      <p>{body}</p>
      <img src={image} alt={image} />
    </article>
  )
}

export default Article;
