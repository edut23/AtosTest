import { Api } from "../axios-config";
<<<<<<< HEAD
//import axios from "axios";
//import MockAdapter from "axios-mock-adapter"; 
=======

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
}

interface Item{
    id: number,
    user: string,
    password: string,
    name: string,
    cpf: string,
    birth: string,
    products: Products[],
}
>>>>>>> 24ebdde8ea7aecd79089bd0319fb03b9f7c1bf56


export const loginApi = async (email: string, password: string): Promise<string | Error> => {
    try{
        const { data } = await Api.post('/auth/login', {email, password});
        
        if(data)
            return data.access_token;
        else
            return new Error('Credenciais inválidas')

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Listing movies error.')
    }
};