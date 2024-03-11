import { useEffect, useState } from "react"
import { getProductsAPI } from "../api/getProductsAPI";
import { PostProductsAPI } from "../api/postProductsAPI";
import { EditProductsAPI } from "../api/editProductsAPI";

interface Error{
    id: number,
    name: string,
    cost: string,
    category: string,
    date: string,
    productId: number
}

interface Products{
    id: number,
    name: string,
    cost: number,
    category: string,
    date: string,
    productId: number,
    units: number
}

const useMenu = (auth: string) => {
    const [addMode, setAddmode] = useState("off");
    const [form, setForm] = useState<Products>({
        id: 1,
        name: "",
        cost: 1,
        category: "",
        productId: 1,
        date: "",
        units: 1
    });
    const [unit, setUnits] = useState(1);
    const [error, setError] = useState<Partial<Error>>({});
    const [products, setProducts] = useState<Products[]>([]);
    const [key, setKey] = useState(-1);

    useEffect(() => {
        getData();
    },[addMode])

    const getData = async () => {
        if(addMode === "off")
            getProductsAPI(auth)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                    else {
                        let temp: Products[] = [];
                        result.data.map((item) => {
                            temp = [...temp, item];

                            return temp
                        })
                        setProducts(temp);
                    }
                })
    }


    const handleName = (value: string) =>{
        setForm({...form, name: value});
    }

    const handlePrice = (value: number) =>{
        setForm({...form, cost: value});
    }

    const handleCategory = (value: string) =>{
        setForm({...form, category: value});
    }

    const handleProductId = (value: number) =>{
        setForm({...form, productId: value});
    }

    const handleUnit = (value: number) => {
        setForm({...form, units: value});
    }

    const validarCampos = () => {
        const novosErros: Partial<Error> = {};
      
        if (form.name.trim() === '' && form.name.length < 1) {
          novosErros.name = 'Insira um nome com mais de um caractere';
        }
      
        if (form.cost < 0.01) {
            novosErros.cost = 'O valor do produto deve ser mais que R$0,01';
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

    const addProduct = async () => {
        if(validarCampos()){
            let tempArray = {
                    id: form.productId,
                    name: form.name,
                    cost: form.cost,
                    category: form.category,
                    productId: form.productId,
                    date: new Date().toLocaleDateString("pt-BR"),
                    units: form.units
                }
            try{
                await PostProductsAPI(tempArray, auth)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                    else
                        console.log("foi")
                })
                setForm({
                    id: 1,
                    name: "",
                    cost: 1,
                    category: "",
                    productId: 1,
                    date: "",
                    units: 1
                })
                setError({})
                setAddmode("off");    
            }
            catch (error){
            }
        }
    }

    const editProduct = (key: number) => {
        setKey(key);
        setForm(products[key]);
        handleUnit(Math.floor(Math.random() * 20));
        setAddmode("edit");
    };

    const confirmEdit = async() => {
        if(validarCampos()){
            let tempArray = {
                    id: form.id,
                    name: form.name,
                    cost: form.cost,
                    category: form.category,
                    productId: form.productId,
                    date: form.date,
                    units: form.units
                }
            try{
                await EditProductsAPI(form.id, tempArray, auth)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                    else
                        console.log("foi")
                })
                setForm({
                    id: 1,
                    name: "",
                    cost: 1,
                    category: "",
                    productId: 1,
                    date: "",
                    units: 1
                })
                setError({})
                setAddmode("off");
                setKey(-1);    
            }
            catch (error){
            }
        }
    }

    return {
        form,
        handleName,
        handlePrice,
        handleCategory,
        handleProductId,
        handleUnit,
        unit,
        error,
        addMode,
        setAddmode,
        addProduct,
        products,
        editProduct,
        confirmEdit,
        key
    }
}

export default useMenu;