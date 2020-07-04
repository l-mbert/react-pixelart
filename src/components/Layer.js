import React from 'react';
import PropTypes from 'prop-types';

class Layer extends React.Component {
  constructor(props) {
    super(props);

    this.pixelSize = this.props.pixelSize;
    this.pixelColor = 'blue';
    this.mouse = {};
  }

  componentDidMount() {
    this.matrix = Array.from(
      Array(this.props.rows),
      () => new Array(this.props.columns),
    );

    this.context = this.canvas.getContext('2d');

    this.canvas.width = this.props.rows * this.pixelSize;
    this.canvas.height = this.props.columns * this.pixelSize;

    this.canvas.addEventListener('mousedown', this._startDrawing);
    this.canvas.addEventListener('mouseup', this._stopDrawing);
    this.canvas.addEventListener('mouseleave', this._stopDrawing);
    this.canvas.addEventListener('contextmenu', this._clearPixel);

    this._drawGrid();
  }

  updateMouse = (mouse) => {
    this.mouse = mouse;
  };

  _drawGrid = () => {
    const context = this.context;

    context.fillStyle = 'rgba(222, 222, 222, 1)';

    let ps = this.pixelSize;

    for (var i = 0; i < this.props.rows; ++i) {
      for (var j = 0, col = this.props.columns / 2; j < col; ++j) {
        context.rect(2 * j * ps + (i % 2 ? 0 : ps), i * ps, ps, ps);
      }
    }

    context.fill();
  };

  _startDrawing = (event) => {
    if (event.button === 0) {
      const self = this;

      this.interval = setInterval(function () {
        let pos = self.mouse;
        if (pos.x >= 0 && pos.y >= 0) {
          pos['color'] = self.pixelColor;
          self.matrix[pos.x][pos.y] = pos;

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
  };

  _clearPixel = (event) => {
    event.preventDefault();

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
      <canvas
        className='ReactPixelart-Layer'
        ref={(node) => {
          this.canvas = node;
        }}
      />
    );
  }
}

Layer.propTypes = {
  pixelSize: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

export default Layer;
