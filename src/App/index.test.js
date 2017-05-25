import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { mount } from 'enzyme'
import * as Request from '../Request';

const div = document.createElement('div');
Request.default = jest.fn();

it('renders without crashing', () => {
  ReactDOM.render(<App />, div);
});

it('makes the initial wiki request', () => {
  ReactDOM.render(<App />, div);
  expect(Request.default).toBeCalled();
});

it('contains an Article', () => {
  const article = { title: 'A title' }
  const element = mount(<App />)
  element.setState({article: article})
  expect(element.find('article').length).toBe(1);
  expect(element.find('article h1').text()).toBe('A title');
});
