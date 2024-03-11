import useMenu from "../../../hook/useMenu"
import Item from "./item";
import Header from "./header";
import './index.css';
import SubMenu from "./subMenu";
import ProductsList from "./products";

interface MenuProps{
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    auth: string,
}

const Menu = ({setPage, auth}: MenuProps) => {
    const {
        products
    } = useMenu(auth);

    return(
        <div className="menu">
            <SubMenu/>
            <ProductsList products={products} auth={auth}/>
        </div>
    )
}

export default Menu;