import { createContext } from 'react';

const MouseContext = createContext({
  x: 0,
  y: 0,
  color: 'blue',
});

export default MouseContext;
