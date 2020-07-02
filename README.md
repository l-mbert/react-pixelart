# react-pixelart

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A simple Pixeleditor built with [React](https://reactjs.org/).

# Installation and usage

The easiest way to use react-pixelart is to install it from npm and build it into your app with Webpack.

```
yarn add react-pixelart
```

Then use it in your app:

```js
import React from 'react';
import Pixelart from 'react-pixelart';

class App extends React.Component {
  render() {
    return <Pixelart pixelSize={16} columns={32} rows={32} />;
  }
}
```

## Props

- `pixelSize` - specify the Size of an Pixel
- `columns` - number of columns
- `rows` - number of rows

## License

GPL-3.0 Licensed. Copyright (c) Lambert Weller 2020.

[build-badge]: https://img.shields.io/travis/l-mbert/react-pixelart/master.png?style=flat-square
[build]: https://travis-ci.org/l-mbert/react-pixelart
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/l-mbert/react-pixelart/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/l-mbert/react-pixelart
