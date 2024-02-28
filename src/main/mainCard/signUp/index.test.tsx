import { render, fireEvent, renderHook } from '@testing-library/react';
import SignUp from '.';
import useMain from '../../../hook/useMain';


describe('SignUp Component', () => {

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
    const { getByPlaceholderText, getByTitle } = render(<SignUp setPage={setPage.result.current} />);

    fireEvent.change(getByPlaceholderText('Usuário'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Senha'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('name'), { target: { value: 'Fulano da Silva' } });
    fireEvent.change(getByTitle('confirm'), { target: { value: 'testpassword' } });
    fireEvent.change(getByTitle('cpf'), { target: { value: '11022033044' } });
    fireEvent.change(getByTitle('birth'), { target: { value: '1999-02-15' } });
    fireEvent.click(getByTitle('submit'));
  });

});