import { Api } from "../axios-config";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
    userId: number
}

export const updateAPI = async (id: number, itemId: number, product: Products): Promise<void | Error> => {

    try{
        const response = await Api.put(`/products/?userId=${itemId}&id=${id}`, product);

        console.log("foi", response)

    } catch (error) {
        console.error(error)
        return new Error((error as { message: string}).message || 'Listing movies error.')
    }
};