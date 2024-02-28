import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from '.';

describe('Menu Component', () => {
  it('renders correctly', () => {
    const setPage = jest.fn();
    const setData = jest.fn();
    const data = {
      id: 1,
      user: 'testuser',
      password: 'testpassword',
      name: 'John Doe',
      cpf: '12345678910',
      birth: '01/01/2024',
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: 10.0,
          supplier: 'Supplier 1',
          barcode: 123456789
        },
        {
          id: 2,
          name: 'Product 2',
          price: 15.0,
          supplier: 'Supplier 2',
          barcode: 987654321
        }
      ]
    };

    const { getByText, getByTitle } = render(
      <Menu setPage={setPage} data={data} setData={setData} />
    );

    // Verifica se os produtos são renderizados corretamente
    expect(getByTitle('Product 1')).toBeInTheDocument();
    expect(getByTitle('Product 2')).toBeInTheDocument();

    // Verifica se o botão "Adicionar Produto" está presente
    expect(getByText('Adicionar Produto')).toBeInTheDocument();
  });

  it('toggles add mode when clicking "Adicionar Produto" button', () => {
    const setPage = jest.fn();
    const setData = jest.fn();
    const data = {
      id: 1,
      user: 'testuser',
      password: 'testpassword',
      name: 'John Doe',
      cpf: '12345678910',
      birth: '01/01/2024',
      products: []
    };

    const { getByText } = render(
      <Menu setPage={setPage} data={data} setData={setData} />
    );

    // Clica no botão "Adicionar Produto"
    fireEvent.click(getByText('Adicionar Produto'));

    // Verifica se o modo de adição foi ativado
    expect(getByText('Nome do produto:')).toBeInTheDocument();
  });
});