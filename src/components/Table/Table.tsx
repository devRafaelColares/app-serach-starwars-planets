import React from 'react';
import usePlanetsHook from '../../Hooks/planetsHook';

interface Column {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'rotation_period', label: 'Rotation Period' },
  { key: 'orbital_period', label: 'Orbital Period' },
  { key: 'diameter', label: 'Diameter' },
  { key: 'climate', label: 'Climate' },
  { key: 'gravity', label: 'Gravity' },
  { key: 'terrain', label: 'Terrain' },
  { key: 'surface_water', label: 'Surface Water' },
  { key: 'population', label: 'Population' },
  { key: 'films', label: 'Films' },
  { key: 'created', label: 'Created' },
  { key: 'edited', label: 'Edited' },
  { key: 'url', label: 'URL' },
];

function Table() {
  const { planets, loading } = usePlanetsHook();

  if (loading) {
    return <p>Loading...</p>;
  }

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
          {planets.map((planet) => (
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
