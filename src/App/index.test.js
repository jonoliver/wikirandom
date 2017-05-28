import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { mount, shallow } from 'enzyme'
import * as Request from '../Request';

const div = document.createElement('div');
Request.default = jest.fn();
Request.default.mockReturnValue(
  new Promise((resolve) => {
    resolve([{ pageid: 1, title: 'Title 1' }, { pageid: 2, title: 'Title 2' }]);
  })
);

it('renders without crashing', () => {
  ReactDOM.render(<App />, div);
});

it('makes the initial wiki request', () => {
  ReactDOM.render(<App />, div);
  expect(Request.default).toBeCalled();
});

describe('articles have been loaded', () => {
  it('does NOT display a loading message', () => {
    const element = shallow(<App />);
    element.setState({ loading:false });
    expect(element.find('.loader').exists()).toBe(false);
  });
  it('displays the "More Articles" button', () => {
    const element = shallow(<App />);
    element.setState({ loading:false });
    expect(element.find('.fetch-articles').exists()).toBe(true);
  });
  it('displays a list of Articles', () => {
    const articles = [{ pageid: 1, title: 'Title 1' }, { pageid: 2, title: 'Title 2' }]
    const element = mount(<App />)
    element.setState({loading:false, articles: articles})
    expect(element.find('article').length).toBe(2);
    expect(element.find('article').first().find('h1').text()).toBe('Title 1');
    expect(element.find('article').last().find('h1').text()).toBe('Title 2');
  });
});

describe('articles are loading', () => {
  it('displays a loading message', () => {
    const element = shallow(<App />);
    element.setState({ loading:true });
    expect(element.find('.loader').exists()).toBe(true);
  });
  it('does NOT display the "More Articles" button', () => {
    const element = shallow(<App />);
    element.setState({ loading:true });
    expect(element.find('.fetch-articles').exists()).toBe(false);
  });
});

describe('loading new articles', () => {
  it('appends the new articles', async () => {
    const element = mount(<App />);
    element.setState({loading:false});
    await element.find('.fetch-articles').simulate('click');
    expect(element.find('article').length).toBe(2);
  });
});
