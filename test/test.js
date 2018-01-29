import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Overflower from '..';

const testSnapshot = function(tag, props, children) {
  const tree = renderer.create(
    React.createElement(
      tag,
      props,
      children
    )
  ).toJSON();

  expect(tree).toMatchSnapshot();
}

test('Just an overflower', () => {
  testSnapshot(
    Overflower,
    {
      __Overflow: 'Short text'
    },
    'Some very long text'
  );
});

test('Just an overflower without overflow', () => {
  testSnapshot(
    Overflower,
    {},
    'Some very long text'
  );
});
