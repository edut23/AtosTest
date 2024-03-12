import { useState } from "react";
import { loginApi } from "../api/loginAPI";

interface LoginProps{
    setAuth: React.Dispatch<React.SetStateAction<string>>
    saveUsername: React.Dispatch<React.SetStateAction<string>>
}

const useLogin = ({setAuth , saveUsername}: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginApi(username, password);

            if(data instanceof Error)
                setError('Credenciais inválidas');
            else{
                saveUsername(username)
                setAuth(data);
            }
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