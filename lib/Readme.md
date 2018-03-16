This is an implementation of a flexible overflow element (see [article about it](http://kizu.ru/en/blog/flexible-overflow/)), which allows us to have a responsive text snippet that would adjust its content based on available space.

[![Build Status][build]][build-link] [![NPM package version][version]][version-link]

[build]: https://travis-ci.org/bemto/bemto-overflower.svg?branch=master
[build-link]: https://travis-ci.org/bemto/bemto-overflower
[version]: https://img.shields.io/npm/v/bemto-overflower.svg
[version-link]: https://www.npmjs.com/package/bemto-overflower

This component has all the powers of bemto-components beneath, so you can use modifiers, polymorphic tags and all the other stuff. See the docs of [bemto-components](http://kizu.ru/bemto-components/#elements) for more features and [this component's source code](https://github.com/bemto/bemto-overflower) to see how easily it is done.

### Installation & Usage

Note: `bemto-overflower` uses [styled-components](https://www.styled-components.com/) as a peer dependency, as its bad to include more than one instance of styled-components in your app, so you need to have it installed as well.

In your console:

``` sh
npm install --save bemto-overflower
```

Then in `.js`-files of your components:

``` js static
import BemtoOverflower from 'bemto-overflower';
```

This component provides all the stuff that is needed for it to work, and in most cases you won't need to style it in any way, so you could use it right away.

For using the main feature of bemto-overflower, you must pass a string or a node as a `__Overflow` prop and it would create an element that would adapt to its container's width: whenever there won't be enough space for its original content, the content from the `__Overflow` part would be displayed:

    <BemtoOverflower __Overflow='Short text here is.'>
      Some long text that could become shorter.
    </BemtoOverflower>

Its possible to not pass `__Overflower` element, this way our content would just have `text-overflow: ellipsis` on overflow:

    <BemtoOverflower>
      Some long text that could become trimmed with ellipsis.
    </BemtoOverflower>

In future we could add a way to pass an array of possible replacements to enable multi-level overflower (or another way of doing it), but for now you can just pass another one to its `__Overflow` to make it three-leveled:

    <BemtoOverflower
      __Overflow={
        <BemtoOverflower __Overflow='Short text here is.'>
          Some long text that could become shorter.
        </BemtoOverflower>
      }>
      Very long text that would become shorter if you'd resize it.
    </BemtoOverflower>

### Styling guide

If you want to style overflower when used with styled-components, you **must** extend the styles. Don't use the component without extending and don't wrap with `styled()` as this would produce unneeded classNames and would be overall worse than `.extend`. Example:

    const Overflower = BemtoOverflower.extend`
      color: red;
      background: pink;
    `;

    <Overflower __Overflow='Short text here is.'>
      Some long text that could become shorter.
    </Overflower>

### Inner Structure and Elements

The following Elements are available for styling and adding additional props (see the [section about Elements](http://kizu.ru/bemto-components/#elements) for everything about how to use elements):

- The top level, where the default props from your `<Overflower>` would go.
- `__Overflow` — the content and the wrapper for the replacement part.
- `__Original` — the wrapper for the original content.

<!-- -->

    const Overflower = BemtoOverflower.extend`
      &__Original {
        background: pink;
      }
      &__Overflow {
        background: rebeccapurple;
        color: #FFF;
      }
    `;

    <Overflower __Overflow='Short text here is.'>
      Some long text that could become shorter.
    </Overflower>

You can see in the above example how you can control which styles would be applied to which part. However, it is not recommended to use this way of styling parts of Overflower — it is much better to style the elements that you would pass to them otherwise.

### Gradient Overflow

With the existent structure its really easy to create overflower that would be rendered as you'd like. For example, we can make an overflow into a gradient, which when placed over a solid background of the same color would make it look like a gradient fade:

    const GradientOverflower = BemtoOverflower.extend.attrs({
      __Overflow: " "
    })`
      &__Overflow {
        position: relative;
        z-index: 1;
        
        margin-bottom: -1.5em;

        background:
          linear-gradient(to left, #FFF, rgba(255, 255, 255, 0))
          no-repeat 100% 0/50px 100%;
      }
    `;

    <GradientOverflower>
      Some long text that fades into gradient.
    </GradientOverflower>

This works really easily: instead of an overflower with some extra text, we make it empty (but containing just a single nbsp in order not to lose the baseline), but then make it not to take any space by utilizing a negative margin, then moving it in front of our content using z-index and now we can make any visual effect for our fade, in our example — white gradient.

Note how this gradient would appear only when there won't be enough space for our original text: it uses the same method as our usual overflower, which is really handy.

Its also really easy to utilize a mask in case its browser support is ok for you and you want to have your overflower over any background, not necessary solid:

    const MaskOverflower = BemtoOverflower.extend.attrs({
      __Overflow: props => props.children
    })`
      @supports (mask-image: none) {
        &__Overflow {
          text-overflow: clip;
          mask-image:
            linear-gradient(to right, #000, #000 calc(100% - 50px), transparent);
        }
      }
    `;

    <div style={{ background: 'linear-gradient(to top right, pink, orange)', padding: 40 }}>
      <MaskOverflower>
        Some long text that fades into gradient mask.
      </MaskOverflower>
    </div>

You can see how its even less code, though we duplicate (automatically) our content inside overflower in order to use a mask for it. It would also fallback to default ellipsis when there'd be no `mask-image` support.
