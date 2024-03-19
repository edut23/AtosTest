import "./index.css"

import { Products } from "../../../../../interface";

interface EditProps {
    setAddmode: React.Dispatch<React.SetStateAction<string>>, 
    form: Products, 
    handleCategory: (e: string) => void,
    handleName: (e: string) => void,
    handlePrice: (e: number) => void,
    handleProductId: (e: string) => void,
    handleUnit: (e: number) => void,
    key: number,
    confirmEdit: (key: number) => void,
}

const Edit = (props: EditProps) => {
    return(
        <div> 
        <h2 className="registerTitle">Editar Produto</h2>
        <div className="registerDiv">
            <h1>Informações sobre o produto</h1>
            <h3>Favor inserir as informações relativas ao produto que deseja editar.</h3>
            <div className="inputDiv">
                <div className="registerInput">
                    <p>Descrição</p>
                    <input placeholder="Descrição do produto" type="text" value={props.form?.dsProduto} onChange={(e) => props.handleName(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <p>Categoria</p>
                    <input placeholder="Categoria do produto" type="text" value={props.form?.dsCategoria} onChange={(e) => props.handleCategory(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <p>Código</p>
                    <input placeholder="Código do Produto" type="number" value={props.form?.cdProduto} onChange={(e) => props.handleProductId(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <p>Valor</p>
                    <input placeholder="Valor do produto" type="number" value={props.form?.vlProduto} onChange={(e) => props.handlePrice(parseFloat(e.target.value))}/>
                </div>
                <div className="registerInput">
                    <p>Quantiade</p>
                    <input placeholder="Quantidade do produto" type="number" value={props.form?.qtdProduto} onChange={(e) => props.handleUnit(parseInt(e.target.value))}/>
                </div>
            </div>
        </div>
        <div className="registerDiv confirm">
            <div className="titleSection">
                <div>
                    <h1>Confirmação</h1>
                    <h3>Confira os dados antes de editar o produto</h3>
                </div>
                <button className="addButton registerButton" onClick={() => props.confirmEdit(props.key)}>Editar</button>
            </div>
        </div>
        </div>
    )
}

export default Edit