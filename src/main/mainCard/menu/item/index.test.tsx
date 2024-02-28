import { render, fireEvent, screen } from '@testing-library/react';
import Item from '.';

describe('Item Component', () => {
  const item = {
    id: 1,
    name: 'Caneta',
    price: 5.78,
    supplier: 'Bic',
    barcode: 1557894
  };

  const data = {
    id: 1,
    user: 'testuser',
    password: 'testpassword',
    name: 'Teste',
    cpf: '12345678910',
    birth: '01/01/2024',
    products: [item]
  };

  const setData = jest.fn();

  test('renders correctly', () => {
    render(<Item item={item} index={0} setPage={jest.fn()} data={data} setData={setData} />);

    expect(screen.getByText('Nome do produto:')).toBeInTheDocument();
    expect(screen.getByText('Preço:')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor:')).toBeInTheDocument();
    expect(screen.getByText('Id:')).toBeInTheDocument();
    expect(screen.getByText('Código de barras:')).toBeInTheDocument();
    expect(screen.getByText('Editar produto')).toBeInTheDocument();
  });

  test('allows editing product name', () => {
    render(<Item item={item} index={0} setPage={jest.fn()} data={data} setData={setData} />);

    const input = screen.getByTitle('Caneta');
    const buttonEdit = screen.getByText('Editar produto');

    fireEvent.click(buttonEdit);

    fireEvent.change(input, { target: { value: 'Nova Caneta' } });
    
    const buttonSave = screen.getByText('Salvar');

    fireEvent.click(buttonSave);

    expect(input.title).toBe('Nova Caneta');
  });
});