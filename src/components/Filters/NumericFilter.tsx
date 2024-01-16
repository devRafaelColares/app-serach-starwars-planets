import React, { useContext } from 'react';
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

  const handleChange = (event: React
    .ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setNumericFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    const newFilteredPlanetsList = applyNumericFilter(planets);
    const combinedFilteredPlanetsList = currentFilteredPlanets.length
      ? newFilteredPlanetsList.filter((planet: any) => currentFilteredPlanets
        .some((prevPlanet: any) => prevPlanet.name === planet.name))
      : newFilteredPlanetsList;

    setFilteredPlanets(combinedFilteredPlanetsList);
    setFilter((prevFilters: any) => [...prevFilters, usedFilters]);
  };

  const { column, comparison, value } = numericFilter;
  const usedFilters = `${column} ${comparison} ${value}`;

  return (
    <div>
      <div>
        <section>
          <select
            data-testid="column-filter"
            name="column"
            value={ column }
            onChange={ handleChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </section>

        <section>
          <select
            data-testid="comparison-filter"
            name="comparison"
            value={ comparison }
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
            value={ value }
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
        <section>{ filter }</section>
      </div>
    </div>
  );
}

export default NumericFilter;
