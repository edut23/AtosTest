import useSignUp from '../../../hook/useSignUp';
import './index.css';

interface SignUpProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
}

const SignUp = (props: SignUpProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        name,
        setName,
        cpf,
        setCpf,
        birth,
        setBirth,
        error,
        handleSubmit
    } = useSignUp(props.setPage);

    return(
        <form>
            {error && <p title='error'>{error}</p>}
            <div className='inputDiv'>
                <h2>Nome completo:</h2>
                <input type='text' placeholder='Nome Completo' title='name' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Data de nascimento:</h2>
                <input type='date' placeholder='Ex. 23/01/2001' title='birth' value={birth} onChange={e => setBirth(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>CPF:</h2>
                <input type='text' placeholder='CPF' title='cpf' value={cpf} onChange={e => setCpf(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Nome de usuário:</h2>
                <input type='text' placeholder='Usuário' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Senha:</h2>
                <input type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Confirme sua senha:</h2>
                <input type='password' placeholder='Confirme a senha' title='confirm' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
            <button title='submit' onClick={e => handleSubmit(e)}>Cadastrar</button>
            <div className='signUpText'>
                <h2>Já se cadastrou? <i onClick={() => props?.setPage('login')}>Faça o login</i></h2>
            </div>
        </form>
    )
}

export default SignUp;