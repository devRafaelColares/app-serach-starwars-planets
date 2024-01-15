import React from 'react';
import Table from './components/Table/Table';
import './components/Table/Table.css';
import NumericFilter from './components/Filters/NumericFilter';
import FilterByName from './components/Filters/FilterByName';

function App() {
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <FilterByName />
      <NumericFilter />
      <Table />
    </div>
  );
}

export default App;
