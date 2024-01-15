import React, { useContext, useState } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Filters() {
  const [filterValue, setFilterValue] = useState('');
  const { planets, setFilteredPlanets } = useContext(PlanetsContext);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value.toLowerCase();
    setFilterValue(filterText);

    if (filterText === '') {
      setFilteredPlanets(planets);
    } else {
      const filteredPlanetsList = planets
        .filter((planet: any) => planet.name.toLowerCase().includes(filterText));
      setFilteredPlanets(filteredPlanetsList);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterValue }
        onChange={ handleFilterChange }
        placeholder="Filter by name"
      />
    </div>
  );
}

export default Filters;
