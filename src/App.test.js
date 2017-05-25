import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Request from './Request';

const div = document.createElement('div');
Request.default = jest.fn();

it('renders without crashing', () => {
  ReactDOM.render(<App />, div);
});

it('makes the initial wiki request', () => {
  ReactDOM.render(<App />, div);
  expect(Request.default).toBeCalled();
});
