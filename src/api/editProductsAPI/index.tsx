import { Api } from "../axios-config";

import { Products } from "../../interface";

interface Data{
    data: Products[],
}

export const EditProductsAPI = async (id: number, Product: Products, token: string): Promise<Data | Error> => {

    try{
        const {data} = await Api.patch(`/products/${id}`, Product, {headers: { 'Authorization' : `Bearer ${token}`}});

        return {data}
    } catch (error) {
        return new Error((error as { message: string}).message || 'Update error.')
    }
};