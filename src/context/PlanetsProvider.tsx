import { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import useFetch from '../Hooks/useFetch';
import { Planet, PlanetsProviderProps } from '../Types';

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [filter, setFilter] = useState('');

  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const { data, loading, error } = useFetch('https://swapi.dev/api/planets/');

  useEffect(() => {
    if (data) {
      const filteredData = data
        .map(({ residents, ...filteredPlanet }) => filteredPlanet);

      setPlanets(filteredData);
      setFilteredPlanets(filteredData);
    }
  }, [data]);

  return (
    <PlanetsContext.Provider
      value={ {
        filteredPlanets,
        setFilteredPlanets,
        planets,
        loading,
        numericFilter,
        setNumericFilter,
        filter,
        setFilter,
        error } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
