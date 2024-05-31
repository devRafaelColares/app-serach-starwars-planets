import React from 'react';
import Table from './components/Table/Table';
import './components/Table/Table.css';
import NumericFilter from './components/Filters/NumericFilter';
import FilterByName from './components/Filters/FilterByName';
import FilterBySort from './components/Filters/FilterBySort';

function App() {
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <FilterByName />
      <NumericFilter />
      <FilterBySort />
      <Table />
    </div>
  );
}

export default App;
