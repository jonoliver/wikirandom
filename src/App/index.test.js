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

it('contains a list of Articles', () => {
  const articles = [{ pageid: 1, title: 'Title 1' }, { pageid: 2, title: 'Title 2' }]
  const element = mount(<App />)
  element.setState({articles: articles})
  expect(element.find('article').length).toBe(2);
  expect(element.find('article').first().find('h1').text()).toBe('Title 1');
  expect(element.find('article').last().find('h1').text()).toBe('Title 2');
});
