import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Table() {
  const { filteredPlanets, loading, error } = useContext(PlanetsContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const columns = Object.keys(filteredPlanets[0] || {}).map((key) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={ key }>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {columns.map(({ key, label }) => (
                <td
                  key={ `${planet.name}-${key}` }
                  data-testid={ key === 'name' ? 'planet-name' : null }
                >
                  {planet[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
