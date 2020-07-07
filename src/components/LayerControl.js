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
    const id =
      this.layers.length > 0 ? this.layers[this.layers.length - 1].id + 1 : 1;
    this.layers.push({
      id,
      name: `Layer ${id}`,
      preview:
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      matrix: [[]],
      locked: false,
      hidden: false,
    });
    this.updateAllLayers(this.layers);
  };

  removeLayer = (layer) => {
    this.layers = this.layers.filter((l) => {
      if (l.id === layer.id) return false;
      return true;
    });
    this.updateAllLayers(this.layers);
  };

  hideLayer = (layer) => {
    this.layers = this.layers.map((l) => {
      if (l.id === layer.id) {
        return {
          ...l,
          hidden: !l.hidden,
        };
      }
      return l;
    });
    this.updateAllLayers(this.layers);
  };

  duplicateLayer = () => {};

  lockLayer = () => {
    this.layers = this.layers.map((l) => {
      if (l.id === layer.id) {
        return {
          ...l,
          locked: !l.locked,
        };
      }
      return l;
    });
    this.updateAllLayers(this.layers);
  };

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
                      <button
                        className='ReactPixelart-LayerControl-layersItem-hide'
                        onClick={() => {
                          this.hideLayer(layer);
                        }}
                      >
                        Hide
                      </button>
                      <div className='ReactPixelart-LayerControl-layersItem-preview'>
                        <img
                          src={layer.preview}
                          style={{
                            width: '100px',
                            height: '100px',
                          }}
                        />
                      </div>
                      <div className='ReactPixelart-LayerControl-layersItem-right'>
                        <div className='ReactPixelart-LayerControl-layersItem-rightName'>
                          {layer.name}
                        </div>
                        <button className='ReactPixelart-LayerControl-layersItem-rightLock'>
                          Lock
                        </button>
                        <button
                          className='ReactPixelart-LayerControl-layersItem-rightDelete'
                          onClick={() => {
                            this.removeLayer(layer);
                          }}
                        >
                          Delete
                        </button>
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
