import { useState } from "react"
import { updateAPI } from "../api/updateAPI";

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

interface MenuProps{
    item: Products,  
    products: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}


const useItem = ({item, products, setData}: MenuProps) => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [supplier, setSupplier] = useState(item.supplier);
    const [barcode, setBarcode] = useState(item.barcode);


    const editProduct = (index: number) => {
        let tempArray = products.products;
        tempArray[index] = {
            id: tempArray[index].id,
            name: name,
            price: price,
            supplier: supplier,
            barcode: barcode,
            userId: products.id
        }

        setData({id: products.id, products: tempArray});

        try{
            updateAPI(products.id, index+1, tempArray[index])
        }
        catch (error){
            console.log("F")
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