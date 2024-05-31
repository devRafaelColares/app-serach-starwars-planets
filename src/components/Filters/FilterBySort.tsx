import { useState, useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function FilterBySort() {
  const {
    setFilteredPlanets,
    planets,
    setFilter,
    filter: appliedFilters,
    filteredPlanets: currentFilteredPlanets,
  } = useContext(PlanetsContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isSorting, setIsSorting] = useState(false);

  const handleColumnChange = (e: any) => {
    setSelectedColumn(e.target.value);
  };

  const handleSortOrderChange = (e: any) => {
    setSortOrder(e.target.value);
  };

  const handleSortButtonClick = () => {
    setIsSorting(true);
    const sortedPlanets = sortPlanets(planets, selectedColumn, sortOrder);
    setFilteredPlanets(sortedPlanets);
  };

  const sortPlanets = (data: any, column: any, order: any) => {
    return data.slice().sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA === 'unknown') {
        return 1;
      }

      if (valueB === 'unknown') {
        return -1;
      }

      if (order === 'asc') {
        return valueA - valueB;
      }

      return valueB - valueA;
    });
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        value={ selectedColumn }
        onChange={ handleColumnChange }
      >
        {['population', 'orbital_period', 'diameter',
          'rotation_period', 'surface_water'].map((col) => (
            <option key={ col } value={ col }>{col}</option>
        ))}
      </select>

      <input
        type="radio"
        data-testid="column-sort-input-asc"
        value="asc"
        checked={ sortOrder === 'asc' }
        onChange={ handleSortOrderChange }
      />
      <label htmlFor="asc">Ascending</label>

      <input
        type="radio"
        data-testid="column-sort-input-desc"
        value="desc"
        checked={ sortOrder === 'desc' }
        onChange={ handleSortOrderChange }
      />
      <label htmlFor="desc">Descending</label>

      <div>
        <button
          data-testid="column-sort-button"
          onClick={ handleSortButtonClick }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default FilterBySort;
