# bemto-overflower [![Build Status][build]][build-link] [![NPM package version][version]][version-link]

[build]: https://travis-ci.org/bemto/bemto-overflower.svg?branch=master
[build-link]: https://travis-ci.org/bemto/bemto-overflower
[version]: https://img.shields.io/npm/v/bemto-overflower.svg
[version-link]: https://www.npmjs.com/package/bemto-overflower

This is a flexible content overflow component, using [bemto-components](https://github.com/bemto/bemto-components) and [styled-components](https://www.styled-components.com/).

The documentation for the bemto-overflower is available as a [section of bemto-components' docs](http://kizu.ru/bemto-components/#bemtooverflower). You could see there all the features of bemto-overflower and play with them right in your browser in an interactive playgrounds.

### Installation & Usage

Note: `bemto-overflower` uses [styled-components](https://www.styled-components.com/) as a peer dependency, as its bad to include more than one instance of styled-components in your app, so you need to have it installed as well.

In your console:

``` sh
npm install --save bemto-overflower
```

Then in `.js`-files of your components:

``` js static
import Overflower from 'bemto-overflower';
```

## License

Licensed under the MIT License, Copyright © 2017 Roman Komarov.

See [LICENSE](./) for more information.
