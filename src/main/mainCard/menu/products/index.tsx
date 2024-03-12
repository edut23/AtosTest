import { useState } from "react";
import "./index.css"
import Register from "./register";
import useMenu from "../../../../hook/useMenu";
import Edit from "./edit";
import SearchIcon from "../../../../assets/searchIcon";

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
        modal,
        setModal,
        addProduct,
        products,
        editProduct,
        confirmEdit,
        key,
        deleteProduct,
        setDeleteId
    } = useMenu(auth);

    const [search, setSearch] = useState('')
 
    const lowerSearch = search.toLowerCase();

    const mainFilter = products.filter((item) =>
            item.name.toLowerCase().includes(lowerSearch) ||
            item.category.toLowerCase().includes(lowerSearch) ||
            item.date.toLowerCase().includes(lowerSearch)
        );

    return (
        <div className="productsDiv">
            {modal &&
            <div className="deleteModal">
                <h2>Deseja realmente excluir o produto?</h2>
                <button className="blue" onClick={() => {setModal(false); setDeleteId(-1)}}>Não</button>
                <button className="red" onClick={() => {deleteProduct()}}>Sim</button>
            </div>
            }
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
            <div className="subHeader">
                <h2>Seus Cadastros</h2>
                <div className="counter">
                    <p>{products.length}</p>
                    <h3>Total de cadastros</h3>
                </div>
            </div>
            <div className="searchDiv">
                <div className="list searchBar">
                    <input type="text" placeholder="Procurar..." onChange={(e) => setSearch(e.target.value)} />
                    <SearchIcon/>
                </div>
                <h3>Última atualização: {new Date().toLocaleString("pt-BR")}</h3>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Data Cadastro</th>
                    <th>Cód. Produto</th>
                    <th>Preço</th>
                    <th className="center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {mainFilter?.map((value, key) => {
                    return (
                    <tr key={key}>
                        <td>{value.name}</td>
                        <td>{value.category}</td>
                        <td>{value.date}</td>
                        <td>{value.productId}</td>
                        <td>{value.cost}</td>
                        <td className="center">
                            <button className="blue" onClick={() => editProduct(key)}>Editar</button>
                            <button className="red" onClick={() => {setModal(true); setDeleteId(value.id)}}>Excluir</button>
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
                    setAddmode={setAddmode}
                    key={key}
                    confirmEdit={confirmEdit}
                />
            }
        </div>
    )
}

export default ProductsList;