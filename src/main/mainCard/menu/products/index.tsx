import { useState } from "react";
import useMenu from "../../../../hook/useMenu";
import "./index.css"

interface ProductsProps{
    products: [Object],
}

const Products = ({products: []}) => {
    const [productsArray, setProducts] = useState<[Object]>()

    return (
        <div className="productsDiv">
            <h1>Olá Usuário</h1>
            <h3>Seja bem-vindo!</h3>
            <hr/>
            <h2>Seus Cadastros</h2>
            {productsArray && 
            productsArray.map((item) => {
                <h1>{item?.name}</h1>
            })}
        </div>
    )
}

export default Products;