import useLogin from '../../../hook/useLogin';
import './index.css';

interface LoginProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
}

const Login = (props: LoginProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    } = useLogin(props?.setPage);

    return(
        <form>
            {error && <p title='error'>{error}</p>}
            <div className='inputDiv'>
                <h2>Usuário:</h2>
                <input type='text' placeholder='Usuário' className='user' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Senha:</h2>
                <input type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='submit' onClick={e => handleSubmit(e)}>Entrar</button>
            <div className='signUpText'>
                <h2>Ainda não se cadastrou? <i onClick={() => props?.setPage('signup')}>Cadastre-se</i></h2>
            </div>
        </form>
    )
}

export default Login;