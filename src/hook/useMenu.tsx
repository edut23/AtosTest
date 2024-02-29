import { useEffect, useState } from "react"
import { updateAPI } from "../api/updateAPI";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
}

interface Error{
    id: string,
    name: string,
    price: string,
    supplier: string,
    barcode: string,
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
    const [form, setForm] = useState<Products>({
        id: data.products.length + 1,
        name: '',
        price: 0,
        supplier: '',
        barcode: 0,
    });
    const [error, setError] = useState<Partial<Error>>({});


    const handleName = (value: string) =>{
        setForm({...form, name: value});
    }

    const handlePrice = (value: number) =>{
        setForm({...form, price: value});
    }

    const handleSupplier = (value: string) =>{
        setForm({...form, supplier: value});
    }

    const handleBarcode = (value: number) =>{
        setForm({...form, barcode: value});
    }

    const validarCampos = () => {
        const novosErros: Partial<Error> = {};
      
        if (form.name.trim() === '' && form.name.length < 1) {
          novosErros.name = 'Insira um nome com mais de um caractere';
        }
      
        if (form.price < 0.01) {
            novosErros.price = 'O valor do produto deve ser mais que R$0,01';
        }
      
        if (form.supplier.trim() === '' && form.supplier.length < 1) {
            novosErros.supplier = 'Insira um fornecedor com mais de um caractere';
        }

        if (form.barcode.toString().length !== 7) {
            novosErros.barcode = 'Insira um código de 7 dígitos';
        }

        console.log(Object.keys(novosErros).length)

        if (Object.keys(novosErros).length === 0) {
            console.log("foi")
            return true;
        } else {
            setError(novosErros);
            console.log("ero")
        
            return false
        }
    }

    const addProduct = () => {
        if(validarCampos()){
            let tempArray = data.products;
            tempArray = [...tempArray, {
                    id: tempArray.length + 1,
                    name: form.name,
                    price: form.price,
                    supplier: form.supplier,
                    barcode: form.barcode
                }
            ]
            setData({...data, products: tempArray});
            try{
                updateAPI(data.id, data);
                setForm({
                    id: data.products.length + 1,
                    name: '',
                    price: 0,
                    supplier: '',
                    barcode: 0,
                })
                setError({})
                setAddmode(false);    
            }
            catch (error){
            }
        }
    }

    return {
        form,
        handleName,
        handlePrice,
        handleSupplier,
        handleBarcode,
        error,
        addMode,
        setAddmode,
        addProduct,
    }
}

export default useMenu;