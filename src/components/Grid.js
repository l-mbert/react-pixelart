import React from 'react';
import PropTypes from 'prop-types';

class Grid extends React.Component {
  componentDidMount() {
    this.context = this.canvas.getContext('2d');

    this.canvas.width = this.props.rows * this.props.pixelSize;
    this.canvas.height = this.props.columns * this.props.pixelSize;

    this._drawGrid();
  }

  _drawGrid = () => {
    const context = this.context;

    context.fillStyle = 'rgba(222, 222, 222, 1)';

    let ps = this.props.pixelSize;

    for (var i = 0; i < this.props.rows; ++i) {
      for (var j = 0, col = this.props.columns / 2; j < col; ++j) {
        context.rect(2 * j * ps + (i % 2 ? 0 : ps), i * ps, ps, ps);
      }
    }

    context.fill();
  };

  render() {
    return (
      <canvas
        className='ReactPixelart-Grid'
        ref={(node) => {
          this.canvas = node;
        }}
        style={{
          position: 'absolute',
        }}
      />
    );
  }
}

Grid.propTypes = {
  pixelSize: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

export default Grid;
