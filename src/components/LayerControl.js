import React from 'react';

const mockLayerObj = {
  id: 1,
  name: 'Layer 1',
  matrix: [[]],
  locked: false,
  hidden: false,
};

class LayerControl extends React.Component {
  addLayer = () => {};

  removeLayer = () => {};

  hideLayer = () => {};

  duplicateLayer = () => {};

  lockLayer = () => {};

  renameLayer = () => {};

  render() {
    return (
      <div className='ReactPixelart-LayerControl'>
        <div className='ReactPixelart-LayerControl-layers'>
          {this.props.layers &&
            this.props.layers.map((layer) => (
              <div
                className='ReactPixelart-LayerControl-layersItem'
                key={layer.id}
              >
                <button className='ReactPixelart-LayerControl-layersItem-hide'>
                  Hide
                </button>
                <div className='ReactPixelart-LayerControl-layersItem-preview'>
                  Preview...
                </div>
                <div className='ReactPixelart-LayerControl-layersItem-right'>
                  <div className='ReactPixelart-LayerControl-layersItem-rightName'>
                    {layer.name}
                  </div>
                  <div className='ReactPixelart-LayerControl-layersItem-rightLock'>
                    Lock
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='ReactPixelart-LayerControl-actions'>
          <button>New Layer</button>
        </div>
      </div>
    );
  }
}

export default LayerControl;
