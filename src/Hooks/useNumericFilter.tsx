import { useState } from 'react';

const useNumericFilter = () => {
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const applyNumericFilter = (planets: any) => {
    return planets.filter((planet: any) => {
      const numericValue = parseFloat(planet[numericFilter.column]);
      const filterValue = parseFloat(numericFilter.value);

      switch (numericFilter.comparison) {
        case 'maior que':
          return numericValue > filterValue;
        case 'menor que':
          return numericValue < filterValue;
        case 'igual a':
          return numericValue === filterValue;
        default:
          return true;
      }
    });
  };

  return { numericFilter, setNumericFilter, applyNumericFilter };
};

export default useNumericFilter;
