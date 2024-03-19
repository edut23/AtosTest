import { Api } from "../axios-config";

import { Products } from "../../interface";

interface Data{
    data: Products[],
}

export const getProductsAPI = async (token: string): Promise<Data | Error> => {

    try{
        const {data} = await Api.get(`/products`, {headers: { 'Authorization' : `Bearer ${token}`}});

        return {data}
    } catch (error) {
        return new Error((error as { message: string}).message || 'Update error.')
    }
};