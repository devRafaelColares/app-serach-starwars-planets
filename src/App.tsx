import React from 'react';
import Table from './components/Table/Table';
import './components/Table/Table.css';
import Filters from './components/Filters/Filters';

function App() {
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
