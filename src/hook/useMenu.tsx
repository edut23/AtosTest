import { useEffect, useState } from "react"
import { getProductsAPI } from "../api/getProductsAPI";
import { PostProductsAPI } from "../api/postProductsAPI";
import { EditProductsAPI } from "../api/editProductsAPI";
import { DeleteProductsAPI } from "../api/deleteProductsAPI";
import { Products, ProductError } from "../interface";

const useMenu = (auth: string) => {
    const [addMode, setAddmode] = useState("off");
    const [form, setForm] = useState<Products>({
        id: 1,
        dsProduto: "",
        vlProduto: 0,
        dsCategoria: "",
        dtCadastro: "",
        cdProduto: "",
        qtdProduto: 1
    });
    const [modal, setModal] = useState(false);
    const [error, setError] = useState<Partial<ProductError>>({});
    const [products, setProducts] = useState<Products[]>([]);
    const [key, setKey] = useState(-1);
    const [deleteId, setDeleteId] = useState(-1);

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
                            console.log(result.data, temp)

                            return temp
                        })
                        setProducts(temp);
                    }
                })
    }


    const handleName = (value: string) =>{
        setForm({...form, dsProduto: value});
    }

    const handlePrice = (value: number) =>{
        setForm({...form, vlProduto: value});
    }

    const handleCategory = (value: string) =>{
        setForm({...form, dsCategoria: value});
    }

    const handleProductId = (value: string) =>{
        setForm({...form, cdProduto: value});
    }

    const handleUnit = (value: number) => {
        setForm({...form, qtdProduto: value});
    }

    const validarCampos = () => {
        const novosErros: Partial<ProductError> = {};
      
        if (form.dsProduto.trim() === '' && form.dsProduto.length < 1) {
          novosErros.dsProduto = 'Insira um nome com mais de um caractere';
        }
      
        if (form.vlProduto < 0.01) {
            novosErros.vlProduto = 'O valor do produto deve ser mais que R$0,01';
        }


        if (Object.keys(novosErros).length === 0) {
            return true;
        } else {
            setError(novosErros);
        
            return false
        }
    }

    const addProduct = async () => {
        if(validarCampos()){
            let tempArray = {
                    id: products.length + 1,
                    dsProduto: form.dsProduto,
                    vlProduto: form.vlProduto,
                    dsCategoria: form.dsCategoria,
                    cdProduto: form.cdProduto,
                    dtCadastro: new Date().toString(),
                    qtdProduto: form.qtdProduto
                }
            try{
                await PostProductsAPI(tempArray, auth)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                })
                setForm({
                    id: 1,
                    dsProduto: "",
                    vlProduto: 0,
                    dsCategoria: "",
                    dtCadastro: "",
                    cdProduto: "",
                    qtdProduto: 1
                })
                setError({})
                setAddmode("off");    
            }
            catch (error){
            }
        }
    }

    const editProduct = async (key: number) => {
        await setForm(products[key]);
        await setKey(key);
        setAddmode("edit");
    };

    const confirmEdit = async() => {
        if(validarCampos()){
            let tempArray = {
                    id: form.id,
                    dsProduto: form.dsProduto,
                    vlProduto: form.vlProduto,
                    dsCategoria: form.dsCategoria,
                    cdProduto: form.cdProduto,
                    dtCadastro: form.dtCadastro,
                    qtdProduto: form.qtdProduto
                }
            try{
                await EditProductsAPI(form.id, tempArray, auth)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                })
                setForm({
                    id: 1,
                    dsProduto: "",
                    vlProduto: 0,
                    dsCategoria: "",
                    dtCadastro: "",
                    cdProduto: "",
                    qtdProduto: 1
                })
                setError({})
                setAddmode("off");
                setKey(-1);    
            }
            catch (error){
            }
        }
    }

    const deleteProduct = async() => {
        try{
            await DeleteProductsAPI(deleteId, auth)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message)
                }
            })
            setError({});
            getData();
            setAddmode("off");
            setDeleteId(-1);
            setModal(false);   
        }
        catch (error){
        }
    }

    return {
        form,
        handleName,
        handlePrice,
        handleCategory,
        handleProductId,
        handleUnit,
        modal,
        setModal,
        error,
        addMode,
        setAddmode,
        addProduct,
        products,
        setProducts,
        editProduct,
        confirmEdit,
        key,
        setKey,
        deleteProduct,
        setDeleteId
    }
}

export default useMenu;