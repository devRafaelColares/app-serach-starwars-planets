import React, { useContext } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

function Table() {
  const { planets, loading, error } = useContext(PlanetsContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const columns = Object.keys(planets[0] || {}).map((key) => ({
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
          {planets.map((planet: any) => (
            <tr key={ planet.name }>
              {columns.map(({ key }) => (
                <td key={ `${planet.name}-${key}` }>{planet[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
