import { useState } from "react";
import "./index.css"
import Register from "./register";
import useMenu from "../../../../hook/useMenu";
import Edit from "./edit";
import SearchIcon from "../../../../assets/searchIcon";

import { Products } from "../../../../interface";
import FilterIcon from "../../../../assets/filterIcon";

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
        setProducts,
        editProduct,
        confirmEdit,
        key,
        deleteProduct,
        setDeleteId
    } = useMenu(auth);

    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Products; direction: 'asc' | 'desc' } | null>(null);
 
    const lowerSearch = search.toLowerCase();

    const mainFilter = products.filter((item) =>
        item.dsProduto.toLowerCase().includes(lowerSearch) ||
        item.dsCategoria.toLowerCase().includes(lowerSearch) ||
        item.dtCadastro.toLowerCase().includes(lowerSearch)
    );

    const sortData = (key: keyof Products) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        const sortedData = [...products].sort((a, b) => {
          if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
          if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
          return 0;
        });
        setSortConfig({ key, direction });
        setProducts(sortedData);
      };

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
                    <th onClick={() => sortData("dsProduto")}>Descrição <FilterIcon/></th>
                    <th onClick={() => sortData("dsCategoria")}>Categoria <FilterIcon/></th>
                    <th onClick={() => sortData("dtCadastro")}>Data Cadastro <FilterIcon/></th>
                    <th onClick={() => sortData("cdProduto")}>Cód. Produto <FilterIcon/></th>
                    <th onClick={() => sortData("vlProduto")}>Preço <FilterIcon/></th>
                    <th className="center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {mainFilter?.map((value, key) => {
                    return (
                    <tr key={key}>
                        <td>{value.dsProduto}</td>
                        <td>{value.dsCategoria}</td>
                        <td>{new Date (value.dtCadastro).toLocaleString("pt-BR")}</td>
                        <td>{value.cdProduto}</td>
                        <td>{value.vlProduto}</td>
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