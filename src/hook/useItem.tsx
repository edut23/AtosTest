import { useState } from "react"
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
    item: Products,  
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}


const useItem = ({item, data, setData}: MenuProps) => {
    const [form, setForm] = useState<Products>({
        id: item.id,
        name: item.name,
        price: item.price,
        supplier: item.supplier,
        barcode: item.barcode,
    });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<Partial<Error>>({});

    console.log(item, form)

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
          novosErros.name = 'Nome inválido';
        }
      
        if (form.price < 0.01) {
            novosErros.price = 'Preço inválido';
        }
      
        if (form.supplier.trim() === '' && form.supplier.length < 1) {
            novosErros.supplier = 'Fornecedor inválido';
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


    const editProduct = (index: number) => {
        if(validarCampos()){
            console.log("validou")
            let tempArray = data.products;
            tempArray[index] = form;

            setData({...data, products: tempArray});

            try{
                updateAPI(data.id, data);
            }
            catch (error){
                console.log("F");
            }
            setError({});
            setEditMode(false);
        }
    }

    const cancelEdit = () => {
        setForm({
            id: item.id,
            name: item.name,
            price: item.price,
            supplier: item.supplier,
            barcode: item.barcode,
        })
        setEditMode(false);
    }

    return {
        form,
        handleName,
        handlePrice,
        handleSupplier,
        handleBarcode,
        editMode,
        setEditMode,
        editProduct,
        error,
        cancelEdit,
    }
}

export default useItem;