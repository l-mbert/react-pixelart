import React from 'react';
import PropTypes from 'prop-types';

import Grid from './components/Grid';
import Layer from './components/Layer';

import LayerContext from './helpers/LayerContext';

class ReactPixelart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: [
        {
          id: 1,
          name: 'Layer 1',
          preview: '',
          matrix: [[]],
          locked: false,
          hidden: false,
        },
      ],
    };

    this.layerRefs = [];

    this.pixelSize = this.props.pixelSize;
    this.mouse = {
      x: 0,
      y: 0,
    };

    console.log(props.children);
  }

  componentDidMount() {
    this.mouseContext = this.mouseCanvas.getContext('2d');

    this.mouseCanvas.width = this.props.rows * this.pixelSize;
    this.mouseCanvas.height = this.props.columns * this.pixelSize;

    document.addEventListener('mousemove', this._recordMouseMovement);
  }

  _recordMouseMovement = (event) => {
    this.mouse = this._getMousePosition(event);

    this._drawMouse();
    this.layerRefs.forEach((layer) => {
      if (layer && layer.updateMouse) {
        layer.updateMouse(this.mouse);
      }
    });
  };

  _getMousePosition = (event) => {
    if (this.mouseCanvas) {
      let rect = this.mouseCanvas.getBoundingClientRect();

      let ps = this.pixelSize;

      return {
        x: Math.round((event.clientX - rect.left - ps / 2) / ps),
        y: Math.round((event.clientY - rect.top - ps / 2) / ps),
      };
    }
  };

  _drawMouse = () => {
    const context = this.mouseContext;
    context.clearRect(
      0,
      0,
      this.props.rows * this.pixelSize,
      this.props.columns * this.pixelSize,
    );

    context.fillStyle = this.pixelColor;
    context.globalAlpha = 0.2;
    context.fillRect(
      this.mouse.x * this.pixelSize,
      this.mouse.y * this.pixelSize,
      this.pixelSize,
      this.pixelSize,
    );
    context.globalAlpha = 1;
  };

  updateLayer = (layer) => {
    this.setState((prevState) => ({
      layers: prevState.layers.map((l) => {
        if (l.id === layer.id) return layer;
        return l;
      }),
    }));
  };

  updateAllLayers = (layers) => {
    this.setState({
      layers,
    });
  };

  render() {
    const clonedChildren = [];
    if (this.props.children) {
      let toClone = [];
      if (!Array.isArray(this.props.children)) {
        toClone.push(this.props.children);
      } else {
        toClone = [...this.props.children];
      }
      toClone.forEach((child, index) => {
        const cloned = React.cloneElement(child, {
          ...child.props,
          key: index,
          layers: this.state.layers,
        });
        clonedChildren.push(cloned);
      });
    }

    return (
      <div className='ReactPixelart'>
        <LayerContext.Provider
          value={{
            layers: this.state.layers,
            updateLayer: this.updateLayer,
            updateAllLayers: this.updateAllLayers,
          }}
        >
          <div className='ReactPixelart-Content'>
            <div
              className='ReactPixelart-Layers'
              style={{
                position: 'relative',
              }}
            >
              <Grid
                pixelSize={this.props.pixelSize}
                columns={this.props.columns}
                rows={this.props.columns}
              />
              {this.state.layers.map((layer) => (
                <Layer
                  key={layer.id}
                  ref={(node) => {
                    this.layerRefs.push(node);
                  }}
                  layer={layer}
                  pixelSize={this.props.pixelSize}
                  columns={this.props.columns}
                  rows={this.props.columns}
                />
              ))}
            </div>
            {/* Inline-Styles because nwb doesn't copy CSS Files when Building. It's only two point's which are needed. */}
            <canvas
              ref={(node) => {
                this.mouseCanvas = node;
              }}
              style={{
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </div>
          <div className='ReactPixelart-Controls'>{clonedChildren}</div>
        </LayerContext.Provider>
      </div>
    );
  }
}

ReactPixelart.propTypes = {
  pixelSize: PropTypes.number,
  columns: PropTypes.number,
  rows: PropTypes.number,
};

ReactPixelart.defaultProps = {
  pixelSize: 8,
  columns: 100,
  rows: 100,
};

export default ReactPixelart;
