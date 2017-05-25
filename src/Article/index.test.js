import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Article from './index';

const div = document.createElement('div');

const article = {
  title: 'A title',
  body: 'A body',
  image: 'image.jpg'
}

it('renders without crashing', () => {
  ReactDOM.render(<Article article={article} />, div);
});

test('snapshots', () => {
  const component = Renderer.create(<Article article={article} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
