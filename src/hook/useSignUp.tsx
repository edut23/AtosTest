import { useState } from "react";
import { signUpAPI } from "../api/signUpAPI";

interface SignUpInfo{
    user: string,
    password: string,
    name: string,
    cpf: string,
    birth: string
}

const useSignUp = (setPage: React.Dispatch<React.SetStateAction<string>>) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if((username || password || name || cpf || birth || confirmPassword) === '')
            setError('Preencha todos os campos');
        else if(password !== confirmPassword)
            setError('As senhas divergem');
        else{
            try {
                const info: SignUpInfo = {
                    user: username,
                    password: password,
                    name: name,
                    cpf: cpf,
                    birth: birth,
                }
                const check = await signUpAPI(info);
    
                if(check)
                    setPage('login')
                else
                    setError('Credenciais inválidas');
            } 
            catch (error) {
                setError('Credenciais inválidas');
            }
        }
    };

    return{
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
    }
}

export default useSignUp;