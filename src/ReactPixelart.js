import React from 'react';
import PropTypes from 'prop-types';

class ReactPixelart extends React.Component {
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
    this.drawContext = this.drawCanvas.getContext('2d');
    this.mouseContext = this.mouseCanvas.getContext('2d');

    this.drawCanvas.width = this.props.rows * this.pixelSize;
    this.drawCanvas.height = this.props.columns * this.pixelSize;
    this.mouseCanvas.width = this.props.rows * this.pixelSize;
    this.mouseCanvas.height = this.props.columns * this.pixelSize;

    this.drawCanvas.addEventListener('mousemove', this._recordeMouseMovement);
    this.drawCanvas.addEventListener('mousedown', this._startDrawing);
    this.drawCanvas.addEventListener('mouseup', this._stopDrawing);
    this.drawCanvas.addEventListener('mouseleave', this._stopDrawing);
    this.drawCanvas.addEventListener('contextmenu', this._clearPixel);

    this.mouseCanvas.addEventListener('mousemove', this._recordeMouseMovement);

    this._drawGrid();
    this._draw();
  }

  _recordeMouseMovement = (event) => {
    this.mouse = this._getMousePosition(event);
  };

  _drawGrid = () => {
    const context = this.drawContext;

    context.fillStyle = 'rgba(222, 222, 222, 1)';

    let ps = this.pixelSize;

    for (var i = 0; i < this.props.rows; ++i) {
      for (var j = 0, col = this.props.columns / 2; j < col; ++j) {
        context.rect(2 * j * ps + (i % 2 ? 0 : ps), i * ps, ps, ps);
      }
    }

    context.fill();
  };

  _drawImage = () => {
    this.matrix.forEach((row) => {
      row.forEach((col) => {
        if (col === null) return;
        this.drawContext.fillStyle = col.color || this.pixelColor;
        this.drawContext.fillRect(
          col.x * this.pixelSize,
          col.y * this.pixelSize,
          this.pixelSize,
          this.pixelSize,
        );
      });
    });
  };

  _getMousePosition = (event) => {
    let rect = this.drawCanvas.getBoundingClientRect();

    let w = this.pixelSize;
    let h = this.pixelSize;

    return {
      x: Math.round((event.clientX - rect.left - w / 2) / w),
      y: Math.round((event.clientY - rect.top - h / 2) / h),
    };
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

  _draw = () => {
    this._drawMouse();
    this._drawImage();

    window.requestAnimationFrame(this._draw);
  };

  _startDrawing = (event) => {
    if (event.button === 0) {
      const self = this;

      this.interval = setInterval(function () {
        let pos = self.mouse;
        if (pos.x >= 0 && pos.y >= 0) {
          pos['color'] = self.pixelColor;
          self.matrix[pos.x][pos.y] = pos;
        }
      }, 10);
    }
  };

  _stopDrawing = (event) => {
    clearInterval(this.interval);
  };

  _clearPixel = (event) => {
    event.preventDefault();

    this.matrix[this.mouse.x][this.mouse.y] = null;
    this.drawContext.clearRect(
      this.mouse.x * this.pixelSize,
      this.mouse.y * this.pixelSize,
      this.pixelSize,
      this.pixelSize,
    );

    return false;
  };

  render() {
    return (
      <div className='ReactPixelart'>
        <canvas
          ref={(node) => {
            this.drawCanvas = node;
          }}
        />
        {/* Inline-Styles because nwb doesn't copy CSS Files when Building. It's only two point's which are needed. */}
        <canvas
          ref={(node) => {
            this.mouseCanvas = node;
          }}
          style={{
            pointerEvents: 'none',
            transform: 'translateY(-100%)',
          }}
        />
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
