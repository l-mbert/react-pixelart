import React from 'react';

import LayerContext from '../helpers/LayerContext';

const mockLayerObj = {
  id: 1,
  name: 'Layer 1',
  matrix: [[]],
  locked: false,
  hidden: false,
};

class LayerControl extends React.Component {
  constructor(props) {
    super(props);

    this.layers = [];
    this.updateAllLayers = () => {};
  }

  addLayer = () => {
    this.layers.push({
      id: 2,
      name: 'Layer 2',
      matrix: [[]],
      locked: false,
      hidden: false,
    });
    this.updateAllLayers(this.layers);
  };

  removeLayer = () => {};

  hideLayer = () => {};

  duplicateLayer = () => {};

  lockLayer = () => {};

  renameLayer = () => {};

  render() {
    return (
      <LayerContext.Consumer>
        {({ layers, updateAllLayers }) => {
          this.layers = layers;
          this.updateAllLayers = updateAllLayers;

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
                <button onClick={this.addLayer}>New Layer</button>
              </div>
            </div>
          );
        }}
      </LayerContext.Consumer>
    );
  }
}

export default LayerControl;
