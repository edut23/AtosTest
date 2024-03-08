import { useEffect, useState } from "react"
import { getProductsAPI } from "../api/getProductsAPI";

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
    auth: string,
}

const useMenu = (auth: string) => {
    const [addMode, setAddmode] = useState(false);
    const [form, setForm] = useState<Products>({
        id: 1,
        name: '',
        price: 0,
        supplier: '',
        barcode: 0,
    });
    const [error, setError] = useState<Partial<Error>>({});
    const [products, setProducts] = useState<[]>([])

    const getProducts = async () => {
        try{
            const data = getProductsAPI(auth);

            if(data instanceof Error)
                console.error("data")
            else{
                console.log(data)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    },[])


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
            let tempArray = [{
                    id: 1,
                    name: form.name,
                    price: form.price,
                    supplier: form.supplier,
                    barcode: form.barcode
                }
            ]
            try{
                setForm({
                    id: 1,
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
        products,
    }
}

export default useMenu;