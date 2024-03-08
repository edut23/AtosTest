import React from "react";
import "./index.css"
import AtosLogo from "../../../../assets/atosLogo";
import ProductIcon from "../../../../assets/productIcon";

const SubMenu = () => {
    return (
        <div className="subMenu">
            <div className="headerLogo">
                <AtosLogo/>
            </div>
            <div className="section">
                <ProductIcon/>
                <p>Produtos</p>
            </div>
        </div>
    )
}

export default SubMenu;