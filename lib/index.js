const bemto = require('bemto-components');
const styled = require('styled-components').default;
const css = require('styled-components').css;
const PropTypes = require('prop-types');

const nodeToString = (node) => typeof node === 'string' ? node : false;

const BemtoOverflowerOptions = {
  tag: 'span',
  content: [
    {
      elem: 'Overflow',
      optional: true,
      props: {
        'aria-hidden': true,
        title: props => nodeToString(props.children)
      }
    },
    { elem: 'Original', children: true }
  ]
};

const BemtoOverflowerTag = bemto(BemtoOverflowerOptions);

const BemtoOverflower = styled(BemtoOverflowerTag)`
  display: inline-block;
  overflow: hidden;

  box-sizing: border-box;
  max-width: 100%;
  height: 1.5em;
  line-height: 1.5em;

  white-space: nowrap;
  text-overflow: ellipsis;

  &__Original {
    display: inline;
  }

  &_Overflow {
    display: none;
  }

  @supports (flex-wrap: wrap) {
    & {
      display: inline-flex;
      flex-wrap: wrap;
    }

    &__Original {
      flex-basis: 100%;

      /* Needed only when no overflow text available */
      &:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &__Overflow {
      display: block;
      overflow: hidden;

      flex-grow: 1;
      width: 0;

      text-overflow: ellipsis;
    }
  }
`;

// It gets most of the propTypes from the bemto(),
// but we need to ensure some stuff there anyway.
BemtoOverflower.propTypes = {
  /** Slot for optional replacement element, look at [Element section](#elements) to see how to use it. */
  __Overflow: bemto.DefaultPropTypes.elem
};

/** @component */
export default BemtoOverflower;
