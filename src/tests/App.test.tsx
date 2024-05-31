import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import  renderWithContext  from '../tests/renderWithContext';
import App from '../App';
import FilterBySort from '../components/Filters/FilterBySort';
import Table from '../components/Table/Table';

describe('Testando tela', () => {
  it('Testa se existe um header no App', () => {
    renderWithContext(<App />)
    const header = screen.getByRole('heading', {  name: /star wars planets/i })
    expect(header).toBeInTheDocument();
})
it('Testa se existe um input no App', () => {
  renderWithContext(<App />)
  const input = screen.getByTestId('name-filter')
  expect(input).toBeInTheDocument();
})
it('Testa se existe um button no App', () => {
  renderWithContext(<App />)
  const button = screen.getByRole('button', {  name: /filter/i})
  expect(button).toBeInTheDocument();
})
})

describe('Testando FilterBySort Component', () => {
  it('Renderiza corretamente', () => {
    renderWithContext(<FilterBySort />);
    const columnSortSelect = screen.getByTestId('column-sort');
    const ascRadio = screen.getByTestId('column-sort-input-asc');
    const descRadio = screen.getByTestId('column-sort-input-desc');
    const sortButton = screen.getByTestId('column-sort-button');

    expect(columnSortSelect).toBeInTheDocument();
    expect(ascRadio).toBeInTheDocument();
    expect(descRadio).toBeInTheDocument();
    expect(sortButton).toBeInTheDocument();
  });

   it('Atualiza o estado ao selecionar uma coluna', () => {
     renderWithContext(<FilterBySort />);
     const columnSortSelect = screen.getByTestId('column-sort');

      fireEvent.change(columnSortSelect, { target: { value: 'population' } });

     expect(columnSortSelect).toBe('population');
   });

   it('Atualiza o estado ao selecionar uma ordem ascendente', () => {
     renderWithContext(<FilterBySort />);
     const ascRadio = screen.getByTestId('column-sort-input-asc');

     fireEvent.click(ascRadio);

     expect(ascRadio).toBe(true);
   });

   it('Atualiza o estado ao selecionar uma ordem descendente', () => {
     renderWithContext(<FilterBySort />);
     const descRadio = screen.getByTestId('column-sort-input-desc');

     fireEvent.click(descRadio);

     expect(descRadio).toBe(true);
   });

  //  it('Chama a função de ordenação ao clicar no botão', () => {
  //    const setFilteredPlanetsMock = jest.fn();
  //    renderWithContext(<FilterBySort setFilteredPlanets={setFilteredPlanetsMock} />);
  //    const sortButton = screen.getByTestId('column-sort-button');

  //    fireEvent.click(sortButton);

  //    expect(setFilteredPlanetsMock).toHaveBeenCalled();
  //  });
});

// describe('Testando Table Component', () => {
//   it('Renderiza "Loading..." quando loading é true', () => {
//     renderWithContext(<Table loading={true} />);
//     const loadingElement = screen.getByText(/loading/i);
//     expect(loadingElement).toBeInTheDocument();
//   });

//   it('Renderiza mensagem de erro quando há um erro', () => {
//     const errorMessage = 'Erro ao carregar dados';
//     renderWithContext(<Table error={errorMessage} />);
//     const errorElement = screen.getByText(errorMessage);
//     expect(errorElement).toBeInTheDocument();
//   });

//   it('Renderiza cabeçalho da tabela corretamente', () => {
//     const planets = [
//       { name: 'Tatooine', population: '200000' },
//       // Adicione mais planetas conforme necessário
//     ];

//     renderWithContext(<Table filteredPlanets={planets} />);
//     const tableHeader = screen.getByRole('row', { name: /planet/i });
//     expect(tableHeader).toBeInTheDocument();
//   });

//   it('Renderiza linhas da tabela corretamente', () => {
//     const planets = [
//       { name: 'Tatooine', population: '200000' },
//       // Adicione mais planetas conforme necessário
//     ];

//     renderWithContext(<Table filteredPlanets={planets} />);
//     const planetNameCell = screen.getByTestId('planet-name');
//     expect(planetNameCell).toBeInTheDocument();
//   });
// });