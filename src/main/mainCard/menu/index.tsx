import useMenu from "../../../hook/useMenu"
import Item from "./item";
import Header from "./header";
import './index.css';
import SubMenu from "./subMenu";
import Products from "./products";

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
    auth: string,
}

const Menu = ({setPage, auth}: MenuProps) => {
    const {
        form,
        handleName,
        handlePrice,
        handleSupplier,
        handleBarcode,
        error,
        addMode,
        setAddmode,
        addProduct,
        products
    } = useMenu(auth);

    return(
        <div className="menu">
            <SubMenu/>
            <Products products={products}/>
            
        </div>
    )
}

export default Menu;