import { useEffect, useState } from "react"
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
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}

const useMenu = ({setPage, data, setData}: MenuProps) => {
    const [addMode, setAddmode] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [supplier, setSupplier] = useState('');
    const [barcode, setBarcode] = useState(0);


    const addProduct = () => {
        let tempArray = data.products;
        tempArray = [...tempArray, {
                id: tempArray.length + 1,
                name: name,
                price: price,
                supplier: supplier,
                barcode: barcode
            }
        ]
        setData({...data, products: tempArray});
        try{
            updateAPI(data.id, data);
            setAddmode(false);    
        }
        catch (error){
        }
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
        addMode,
        setAddmode,
        addProduct,
    }
}

export default useMenu;