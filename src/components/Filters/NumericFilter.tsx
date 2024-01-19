import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import useNumericFilter from '../../Hooks/useNumericFilter';

function NumericFilter() {
  const {
    setFilteredPlanets,
    planets,
    setFilter,
    filter,
    filteredPlanets: currentFilteredPlanets,
  } = useContext(PlanetsContext);

  const { numericFilter, setNumericFilter, applyNumericFilter } = useNumericFilter();
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const { results } = await response.json();

        const keys = Object.keys(results[0]);

        const filteredKeys = keys
          .filter((key) => [
            'population',
            'orbital_period',
            'diameter',
            'rotation_period',
            'surface_water',
          ].includes(key));

        setAvailableOptions(filteredKeys);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement 
    | HTMLInputElement>) => {
    const { name, value } = event.target;

    setNumericFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    const currentUsedFilters = `${numericFilter.column} 
    ${numericFilter.comparison} ${numericFilter.value}`;

    if (!filter.includes(currentUsedFilters)) {
      const newFilteredPlanetsList = applyNumericFilter(planets);

      const combinedFilteredPlanetsList = currentFilteredPlanets.length
        ? newFilteredPlanetsList.filter((planet: any) => currentFilteredPlanets
        .some((prevPlanet: any) => prevPlanet.name === planet.name))
        : newFilteredPlanetsList;

      setFilteredPlanets(combinedFilteredPlanetsList);

      setFilter((prevFilters: any) => [...prevFilters, currentUsedFilters]);

      setAvailableOptions((prevOptions) => {
        const updatedOptions = prevOptions.filter((option) => option !== numericFilter.column);

        if (updatedOptions.length > 0) {
          setNumericFilter((prevFilter: any) => ({ ...prevFilter, column: updatedOptions[0] }));
        }

        return updatedOptions;
      });
    }
  };

  const handleRemoveFilter = (index: number) => {
    const removedFilter = filter[index];
    setFilter((prevFilters: any) => prevFilters.filter((_, i: number) => i !== index));

    const updatedAvailableOptions = [...availableOptions, removedFilter.split(' ')[0]];
    setAvailableOptions(updatedAvailableOptions);

    // Remove the specific filter from the filtered planets
    const remainingFilters = filter.filter((_, i: number) => i !== index);
    const updatedFilteredPlanetsList = remainingFilters.reduce(
      (filteredPlanets, filter) => applyNumericFilter(filteredPlanets, filter),
      planets,
    );
    setFilteredPlanets(updatedFilteredPlanetsList);
  };

  const handleRemoveAllFilters = () => {
    setFilter([]);
    setFilteredPlanets(planets);
    setAvailableOptions((prevOptions) => [
      ...prevOptions,
      ...filter.map((filter) => filter.split(' ')[0]),
    ]);
  };

  return (
    <div>
      <div>
        <section>
          <select
            data-testid="column-filter"
            name="column"
            value={ numericFilter.column }
            onChange={ handleChange }
          >
            {availableOptions.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </section>

        <section>
          <select
            data-testid="comparison-filter"
            name="comparison"
            value={ numericFilter.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </section>

        <section>
          <input
            data-testid="value-filter"
            type="number"
            name="value"
            value={ numericFilter.value }
            onChange={ handleChange }
          />
        </section>

        <section>
          <button data-testid="button-filter" onClick={ handleFilterClick }>
            Filter
          </button>
        </section>
      </div>
      <div>
        {Array.isArray(filter)
          && filter.map((prevFilter: any, index: any) => (
            <section key={ index } data-testid="filter">
              <span>{prevFilter}</span>
              <button onClick={ () => handleRemoveFilter(index) }>Remove Filter</button>
            </section>
          ))}
        {filter.length > 0 && (
          <section data-testid="filter" />
        )}
      </div>
      {filter.length > 0 && (
        <div>
          <button
            data-testid="button-remove-filters"
            onClick={ handleRemoveAllFilters }
          >
            Remover todas filtragens
          </button>
        </div>
      )}
    </div>
  );
}

export default NumericFilter;
