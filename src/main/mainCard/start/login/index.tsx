import useLogin from '../../../../hook/useLogin';
import './index.css';

interface LoginProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
    setAuth: React.Dispatch<React.SetStateAction<string>>
    saveUsername: React.Dispatch<React.SetStateAction<string>>
}



const Login = ({setPage, setAuth, saveUsername}: LoginProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    } = useLogin({setAuth, saveUsername});

    return(
        <form className='formDiv'>
            {error && <p title='error' className='error'>{error}</p>}
            <h1 className='title'>Olá!👋</h1>
            <h2 className='subtitle'>Faça o login para começar a gerenciar seus produtos.</h2>
            <div className='inputDiv'>
                <p>Email</p>
                <input type='text' placeholder='seuemail@email.com' className='user' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <p>Password</p>
                <input type='password' placeholder='Digite sua senha...' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='buttonDiv'>
                <button type='submit' className='button' onClick={e => handleSubmit(e)}>Entrar</button>
            </div>
            <div className='orLine'>
                <div className='line'/>
                <p>    
                    Ou
                </p>
                <div className='line'/>
            </div>
            <div className='signUpText'>
                <h2>Não possui conta? <p className='changeSign' onClick={() => setPage('signup')}>Cadastre-se!</p></h2>
            </div>
        </form>
    )
}

export default Login;