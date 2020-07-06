import { createContext } from 'react';

const LayerContext = createContext({
  layers: [],
  updateLayer: () => {},
  updateAllLayers: () => {},
});

export default LayerContext;
