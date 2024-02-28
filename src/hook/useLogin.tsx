import { useState } from "react";
import { loginApi } from "../api/loginAPI";
import { productsAPI } from "../api/productsAPI";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
    userId: number
}


interface Data{
    id: number,
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
            const id = await loginApi(username, password);

            if(id instanceof Error)
                setError('Credenciais inválidas');
            else{
                try{
                    const products = await productsAPI(id);
                    
                    if(products instanceof Error)
                        setError('Erro ao carregar dados');
                    else{
                        setData({id: id, products: products});
                        setPage('menu');
                    }
                }
                catch (error){    
                    setError('Erro ao carregar dados');
                }
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