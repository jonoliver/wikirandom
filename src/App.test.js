import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Request from './Request';

it('renders without crashing', () => {
  const div = document.createElement('div');
  Request.default = jest.fn();
  ReactDOM.render(<App />, div);
});
