import React from 'react';

const Article = ({title, body, image}) =>
  <article>
    <h1>{title}</h1>
    <p>{body}</p>
    <img src={image} alt={image} />
  </article>

export default Article;
