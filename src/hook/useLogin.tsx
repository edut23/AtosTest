import { useState } from "react";
import { loginApi } from "../api/loginAPI";

const useLogin = (setPage: React.Dispatch<React.SetStateAction<string>>) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = await loginApi(username, password);

            if(token === true)
                setPage('menu')
            else
                setError('Credenciais inválidas');
        } 
        catch (error) {
            setError('Credenciais inválidas');
        }
    };

    return{
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit
    }
}

export default useLogin;