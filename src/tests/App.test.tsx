import React from 'react';
import { render, screen } from '@testing-library/react';
import  renderWithContext  from '../tests/renderWithContext';
import App from '../App';

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
