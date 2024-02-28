import { useEffect, useState } from "react"

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
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    products: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}

const useMenu = ({setPage, products, setData}: MenuProps) => {
    const [addMode, setAddmode] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [supplier, setSupplier] = useState('');
    const [barcode, setBarcode] = useState(0);


    const addProduct = () => {
        let tempArray = products.products;
        tempArray = [...tempArray, {
                id: tempArray.length + 1,
                name: name,
                price: price,
                supplier: supplier,
                barcode: barcode,
                userId: products.id
            }
        ]
        setData({id: products.id, products: tempArray});
        setAddmode(false);      
        console.log(tempArray, products);
    }

    useEffect(() => {
        console.log(products)
    }, [products])

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