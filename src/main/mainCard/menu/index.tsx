import useMenu from "../../../hook/useMenu"
import Header from "./header";
import './index.css';
import SubMenu from "./subMenu";
import ProductsList from "./products";

interface MenuProps{
    username: string,  
    auth: string,
}

const Menu = ({username, auth}: MenuProps) => {
    const {
        products
    } = useMenu(auth);

    return(
        <div className="menu">
            <SubMenu/>
            <Header username={username}/>
            <ProductsList products={products} auth={auth}/>
        </div>
    )
}

export default Menu;