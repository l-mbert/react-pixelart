# react-pixelart

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
