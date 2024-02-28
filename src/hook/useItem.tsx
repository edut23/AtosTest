import { useState } from "react"
import { updateAPI } from "../api/updateAPI";

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

interface MenuProps{
    item: Products,  
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}


const useItem = ({item, data, setData}: MenuProps) => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [supplier, setSupplier] = useState(item.supplier);
    const [barcode, setBarcode] = useState(item.barcode);


    const editProduct = (index: number) => {
        let tempArray = data.products;
        tempArray[index] = {
            id: tempArray[index].id,
            name: name,
            price: price,
            supplier: supplier,
            barcode: barcode,
        }

        setData({...data, products: tempArray});

        try{
            updateAPI(data.id, data);
        }
        catch (error){
            console.log("F");
        }
        setEditMode(false);
    }

    const cancelEdit = () => {
        setName(item.name);
        setPrice(item.price);
        setSupplier(item.supplier);
        setBarcode(item.barcode);
        setEditMode(false);
    }

    return {
        name,
        setName,
        price,
        setPrice,
        supplier,
        setSupplier,
        barcode,
        setBarcode,
        editMode,
        setEditMode,
        editProduct,
        cancelEdit,
    }
}

export default useItem;