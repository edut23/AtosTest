import { render, fireEvent, waitFor, renderHook, getByTitle } from '@testing-library/react';
import Login from '.';
import useMain from '../../../hook/useMain';

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setPage = renderHook(() => useMain().setPage);

  it('should render login form', () => {
    const { getByText, getByPlaceholderText } = render(<Login setPage={setPage.rerender} />);
    expect(getByText('Entrar')).toBeInTheDocument();
    expect(getByPlaceholderText('Usuário')).toBeInTheDocument();
    expect(getByPlaceholderText('Senha')).toBeInTheDocument();
  });

  it('should call loginApi with correct credentials on form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<Login setPage={setPage.rerender} />);

    fireEvent.change(getByPlaceholderText('Usuário'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Senha'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Entrar'));
  });
});