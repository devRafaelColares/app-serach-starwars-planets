import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';
import useNumericFilter from '../../Hooks/useNumericFilter';

function NumericFilter() {
  const { setFilteredPlanets, planets } = useContext(PlanetsContext);
  const { numericFilter, setNumericFilter, applyNumericFilter } = useNumericFilter();

  const handleChange = (event: React
    .ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setNumericFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    const filteredPlanetsList = applyNumericFilter(planets);
    setFilteredPlanets(filteredPlanetsList);
  };

  return (
    <div>
      <section>
        <select
          data-testid="column-filter"
          name="column"
          value={ numericFilter.column }
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
  );
}

export default NumericFilter;
