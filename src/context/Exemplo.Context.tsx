import { createContext } from 'react';

type ExemploContextType = {
  exemplo: string;
};
const ExemploContext = createContext({} as ExemploContextType);

export default ExemploContext;
