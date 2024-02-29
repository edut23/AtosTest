import useLogin from '../../../hook/useLogin';
import './index.css';

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
}

interface Data{
    id: number,
    user: string,
    password: string,
    name: string,
    cpf: string,
    birth: string,
    products: Products[],
}

interface LoginProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
    setData: React.Dispatch<React.SetStateAction<Data>>
}



const Login = ({setPage, setData}: LoginProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    } = useLogin({setPage, setData});

    return(
        <form>
            {error && <p title='error' className='error'>{error}</p>}
            <div className='inputDiv'>
                <h2>Usuário:</h2>
                <input type='text' placeholder='Usuário' className='user' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='inputDiv'>
                <h2>Senha:</h2>
                <input type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className='buttonDiv'>
                <button type='submit' className='button' onClick={e => handleSubmit(e)}>Entrar</button>
            </div>
            <div className='signUpText'>
                <h2>Ainda não se cadastrou? <i className='changeSign' onClick={() => setPage('signup')}>Cadastre-se</i></h2>
            </div>
        </form>
    )
}

export default Login;