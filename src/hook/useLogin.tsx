import { useState } from "react";
import { loginApi } from "../api/loginAPI";

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

const useLogin = ({setPage, setData}: LoginProps) => {
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
                setData(data);
                setPage('menu');
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