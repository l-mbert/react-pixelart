import React, { Component } from 'react';
import { render } from 'react-dom';

import './demo.css';
import ReactPixelart from '../../src';
export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-pixelart Demo</h1>
        <ReactPixelart pixelSize={8} columns={64} rows={64} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
