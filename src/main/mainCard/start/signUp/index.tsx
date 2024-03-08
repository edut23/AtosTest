import React from 'react';
import useSignUp from '../../../../hook/useSignUp';
import './index.css';

interface SignUpProps{
    setPage: React.Dispatch<React.SetStateAction<string>>
    setAuth: React.Dispatch<React.SetStateAction<string>>
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
        error,
        handleSubmit
    } = useSignUp(props.setPage, props.setAuth);

    return(
        <form>
            <h1 className='titleSign'>Cadastre-se</h1>
            <h2 className='subtitleSign'>Preencha os campos para concluir seu cadastro</h2>
            <div className='inputDivSign'>
                <h2>Nome</h2>
                <input type='text' placeholder='Nome Completo' min={5} max={100} title='name' value={form.name} onChange={e => handleName(e.target.value)}/>
                {error.name && <p title='error' className='error'>{error.name}</p>}
            </div>
            <div className='inputDivSign'>
                <h2>Email</h2>
                <input type='email' placeholder='Usuário' min={5} max={100} value={form.email} onChange={e => handleUsername(e.target.value)}/>
                {error.email && <p title='error' className='error'>{error.email}</p>}
            </div>
            <div className='inputDivSign'>
                <h2>Senha</h2>
                <input type='password' placeholder='Senha' min={6} max={20} value={form.password} onChange={e => handlePassword(e.target.value)}/>
                {error.password && <p title='error' className='error'>{error.password}</p>}
            </div>
            <div className='inputDivSign'>
                <h2>Confirme sua senha</h2>
                <input type='password' placeholder='Confirme a senha' title='confirm' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)}/>
                {confirmError && <p title='error' className='error'>{confirmError}</p>}
            </div>
            <div className='buttonDiv'>
                <button title='submit' className='button' onClick={e => handleSubmit(e)}>Cadastrar</button>
            </div>
        </form>
    )
}

export default SignUp;