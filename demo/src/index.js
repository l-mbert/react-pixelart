import React, { Component } from 'react';
import { render } from 'react-dom';

import './demo.css';
import ReactPixelart from '../../src';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-pixelart Demo</h1>
        <ReactPixelart pixelSize={16} columns={32} rows={32} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
