import useSignUp from '../../../hook/useSignUp';
import './index.css';

interface SignUpProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
}

const SignUp = (props: SignUpProps) => {
    const {
        form,
        handleUsername,
        handlePassword,
        confirmPassword,
        handleConfirmPassword,
        confirmError,
        handleName,
        handleCpf,
        handleBirth,
        error,
        handleSubmit
    } = useSignUp(props.setPage);

    return(
        <form>
            <div className='inputDiv'>
                <h2>Nome completo:</h2>
                <input type='text' placeholder='Nome Completo' min={5} max={100} title='name' value={form.name} onChange={e => handleName(e.target.value)}/>
                {error.name && <p title='error' className='error'>{error.name}</p>}
            </div>
            <div className='inputDiv'>
                <h2>Data de nascimento:</h2>
                <input type='date' placeholder='Ex. 23/01/2001' title='birth' value={form.birth} onChange={e => handleBirth(e.target.value)}/>
                {error.birth && <p title='error' className='error'>{error.birth}</p>}
            </div>
            <div className='inputDiv'>
                <h2>CPF:</h2>
                <input type='text' placeholder='CPF' title='cpf' value={form.cpf} onChange={e => handleCpf(e.target.value)}/>
                {error.cpf && <p title='error' className='error'>{error.cpf}</p>}
            </div>
            <div className='inputDiv'>
                <h2>Nome de usuário:</h2>
                <input type='text' placeholder='Usuário' min={5} max={100} value={form.user} onChange={e => handleUsername(e.target.value)}/>
                {error.user && <p title='error' className='error'>{error.user}</p>}
            </div>
            <div className='inputDiv'>
                <h2>Senha:</h2>
                <input type='password' placeholder='Senha' min={6} max={20} value={form.password} onChange={e => handlePassword(e.target.value)}/>
                {error.password && <p title='error' className='error'>{error.password}</p>}
            </div>
            <div className='inputDiv'>
                <h2>Confirme sua senha:</h2>
                <input type='password' placeholder='Confirme a senha' title='confirm' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)}/>
                {confirmError && <p title='error' className='error'>{confirmError}</p>}
            </div>
            <div className='buttonDiv'>
                <button title='submit' className='button' onClick={e => handleSubmit(e)}>Cadastrar</button>
            </div>
            <div className='signUpText'>
                <h2>Já se cadastrou? <i onClick={() => props?.setPage('login')}>Faça o login</i></h2>
            </div>
        </form>
    )
}

export default SignUp;