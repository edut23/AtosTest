import { Api } from "../axios-config";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
    userId: number
}

export const productsAPI = async (userId: number): Promise<Products[] | Error> => {

    try{
        const { data } = await Api.get(`/products?userId=${userId}`);

        return data

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Listing products error.')
    }
};