import React, { Component } from 'react';
import { render } from 'react-dom';

import './demo.css';
import ReactPixelart from '../../src';
import LayerControl from '../../src/components/LayerControl';
export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-pixelart Demo</h1>
        <ReactPixelart pixelSize={8} columns={64} rows={64}>
          <LayerControl />
        </ReactPixelart>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
