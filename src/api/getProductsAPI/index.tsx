import { Api } from "../axios-config";

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

export const getProductsAPI = async (token: string): Promise<[] | Error> => {

    try{
        const {data} = await Api.get(`/products`, {headers: { 'Authorization' : `Bearer ${token}`}});

        return data
    } catch (error) {
        return new Error((error as { message: string}).message || 'Update error.')
    }
};