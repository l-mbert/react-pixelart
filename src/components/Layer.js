import React from 'react';
import PropTypes from 'prop-types';

import LayerContext from '../helpers/LayerContext';

class Layer extends React.Component {
  constructor(props) {
    super(props);

    this.pixelSize = this.props.pixelSize;
    this.pixelColor = 'blue';
    this.mouse = {};

    this.updateLayer = () => {};
  }

  componentDidMount() {
    this.matrix = Array.from(
      Array(this.props.rows),
      () => new Array(this.props.columns),
    );

    this.layer = this.props.layer;
    this.layer.matrix = this.matrix;

    this.context = this.canvas.getContext('2d');

    this.canvas.width = this.props.rows * this.pixelSize;
    this.canvas.height = this.props.columns * this.pixelSize;

    this.canvas.addEventListener('mousedown', this._startDrawing);
    this.canvas.addEventListener('mouseup', this._stopDrawing);
    this.canvas.addEventListener('mouseleave', this._stopDrawing);
    this.canvas.addEventListener('contextmenu', this._clearPixel);
  }

  componentDidUpdate() {
    this.context = this.canvas.getContext('2d');

    this.matrix.forEach((row) => {
      row.forEach((col) => {
        if (col === null) return;
        this.context.fillStyle = col.color || this.pixelColor;
        this.context.fillRect(
          col.x * this.pixelSize,
          col.y * this.pixelSize,
          this.pixelSize,
          this.pixelSize,
        );
      });
    });
  }

  updateMouse = (mouse) => {
    this.mouse = mouse;
  };

  _startDrawing = (event) => {
    if (event.button === 0) {
      const self = this;

      this.interval = setInterval(function () {
        let pos = self.mouse;
        if (pos.x >= 0 && pos.y >= 0) {
          pos['color'] = self.pixelColor;
          self.matrix[pos.x][pos.y] = pos;

          self.layer.matrix[pos.x][pos.y] = pos;

          self.context.fillStyle = pos.color || self.pixelColor;
          self.context.fillRect(
            pos.x * self.pixelSize,
            pos.y * self.pixelSize,
            self.pixelSize,
            self.pixelSize,
          );
        }
      }, 1);
    }
  };

  _stopDrawing = (event) => {
    clearInterval(this.interval);
    this.layer.preview = this.canvas.toDataURL('image/jpeg');
    this.updateLayer(this.layer);
  };

  _clearPixel = (event) => {
    event.preventDefault();

    this.layer.matrix[this.mouse.x][this.mouse.y] = null;
    this.layer.preview = this.canvas.toDataURL('image/jpeg');
    this.updateLayer(this.layer);

    this.matrix[this.mouse.x][this.mouse.y] = null;
    this.context.clearRect(
      this.mouse.x * this.pixelSize,
      this.mouse.y * this.pixelSize,
      this.pixelSize,
      this.pixelSize,
    );

    return false;
  };

  render() {
    return (
      <LayerContext.Consumer>
        {({ layers, updateLayer }) => {
          this.layer = layers.filter((l) => {
            if (l.id === this.props.layer.id) return true;
            return false;
          })[0];

          this.updateLayer = updateLayer;

          return (
            <canvas
              className={'ReactPixelart-Layer'}
              ref={(node) => {
                this.canvas = node;
              }}
              style={{
                opacity: this.layer.hidden ? 0 : 1,
                position: 'absolute',
              }}
            />
          );
        }}
      </LayerContext.Consumer>
    );
  }
}

Layer.contextType = LayerContext;

Layer.propTypes = {
  layer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
    locked: PropTypes.bool.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
  pixelSize: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

export default Layer;
