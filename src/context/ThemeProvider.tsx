import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../Hooks/useFetch';
import { Planet, PlanetsProviderProps } from '../Types';

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]); // Especifique o tipo como Planet[]
  const { data, loading, error } = useFetch('https://swapi.dev/api/planets/');

  useEffect(() => {
    if (data) {
      const filteredData = data
        .map(({ residents, ...filteredPlanet }) => filteredPlanet);

      setPlanets(filteredData);
    }
  }, [data]);

  return (
    <PlanetsContext.Provider value={ { planets, loading, error } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
