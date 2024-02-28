import { render, fireEvent, waitFor, renderHook, getByPlaceholderText } from '@testing-library/react';
import SignUp from '../../main/mainCard/signUp';
import { signUpAPI } from '.';
import useMain from '../../hook/useMain';

interface SignUpInfo{
  user: string,
  password: string,
  name: string,
  cpf: string,
  birth: string
}

jest.mock('.', () => ({
  signUpAPI: jest.fn(),
}));

describe('SignUp Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setPage = renderHook(() => useMain().setPage);

  it('should render SignUp form', () => {
    const { getByText } = render(<SignUp setPage={setPage.rerender} />);
    expect(getByText('Cadastrar')).toBeInTheDocument();
    expect(getByText('Nome completo:')).toBeInTheDocument();
    expect(getByText('Nome de usuário:')).toBeInTheDocument();
    expect(getByText('Senha:')).toBeInTheDocument();
    expect(getByText('Confirme sua senha:')).toBeInTheDocument();
    expect(getByText('CPF:')).toBeInTheDocument();
    expect(getByText('Data de nascimento:')).toBeInTheDocument();
  });

  it('should call SignUpApi with correct credentials on form submission', async () => {
    const { getByPlaceholderText, getByTitle } = render(<SignUp setPage={setPage.rerender} />);

    fireEvent.change(getByPlaceholderText('Usuário'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Senha'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('name'), { target: { value: 'Fulano da Silva' } });
    fireEvent.change(getByTitle('confirm'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('cpf'), { target: { value: '11022033044' } });
    fireEvent.change(getByTitle('birth'), { target: { value: '1999-02-15' } });
    fireEvent.click(getByTitle('submit'));

    const info: SignUpInfo = {
      user: 'testuser',
      password: 'testpassword',
      name: 'Fulano da Silva',
      cpf: '11022033044',
      birth: '1999-02-15'
    }

    await waitFor(() => {
      expect(signUpAPI).toHaveBeenCalledWith(info);
    });
  });

  it('should display error message for invalid credentials', async () => {
    (signUpAPI as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByTitle } = render(<SignUp setPage={setPage.result.current} />);

    fireEvent.change(getByPlaceholderText('Usuário'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Senha'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('name'), { target: { value: 'Fulano da Silva' } });
    fireEvent.change(getByTitle('confirm'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('cpf'), { target: { value: '' } });
    fireEvent.change(getByTitle('birth'), { target: { value: '1999-02-15' } });
    fireEvent.click(getByTitle('submit'));

    await waitFor(() => {
      expect(getByTitle('error')).toBeInTheDocument();
    });
  });
});