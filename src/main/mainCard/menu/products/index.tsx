import { useEffect, useState } from "react";
import "./index.css"
import Register from "./register";
import useMenu from "../../../../hook/useMenu";
import Edit from "./edit";

interface Products{
    id: number,
    name: string,
    cost: number,
    category: string,
    date: string,
    productId: number,
    units: number
}

interface ProductsProps{
    products: Products[],
    auth: string
}

const ProductsList = ({auth}: ProductsProps) => {
    const {
        addMode, 
        setAddmode, 
        form, 
        handleCategory,
        handleName,
        handlePrice,
        handleProductId,
        handleUnit,
        unit,
        addProduct,
        products,
        editProduct,
        confirmEdit,
        key
    } = useMenu(auth);

    return (
        <div className="productsDiv">
            <div className="titleSection">
                <div>
                    <h1>Olá Usuário</h1>
                    <h3>Seja bem-vindo!</h3>
                </div>
                {addMode === "off" && <button className="addButton" onClick={() => setAddmode("add")}>+ Novo Produto</button>}
            </div>
            <hr/>
            {addMode === "off" ? 
            <>
            <h2>Seus Cadastros</h2>
            <table>
                <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Cód. Produto</th>
                    <th>Data Cadastro</th>
                    <th>Preço</th>
                    <th className="center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {products?.map((value, key) => {
                    return (
                    <tr key={key}>
                        <td>{value.name}</td>
                        <td>{value.category}</td>
                        <td>{new Date(value.date).toLocaleDateString("pt-BR")}</td>
                        <td>{value.productId}</td>
                        <td>{value.cost}</td>
                        <td className="center">
                            <button onClick={() => editProduct(key)}>Editar</button>
                            <button>Excluir</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </> :
            addMode === "add" ?
                <Register 
                    form={form}
                    handleName={handleName}
                    handleCategory={handleCategory}
                    handlePrice={handlePrice}
                    handleProductId={handleProductId}
                    handleUnit={handleUnit}
                    unit={unit}
                    setAddmode={setAddmode}
                    addProduct={addProduct}
                />
                :
                <Edit 
                    form={form}
                    handleName={handleName}
                    handleCategory={handleCategory}
                    handlePrice={handlePrice}
                    handleProductId={handleProductId}
                    handleUnit={handleUnit}
                    unit={unit}
                    setAddmode={setAddmode}
                    key={key}
                    confirmEdit={confirmEdit}
                />
            }
        </div>
    )
}

export default ProductsList;