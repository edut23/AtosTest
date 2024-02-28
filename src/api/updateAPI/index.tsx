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

export const updateAPI = async (id: number, product: Data): Promise<void | Error> => {

    try{
        await Api.put(`/user/${id}`, product);

    } catch (error) {
        return new Error((error as { message: string}).message || 'Update error.')
    }
};