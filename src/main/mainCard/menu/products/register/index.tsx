import "./index.css"

interface Products{
    id: number,
    name: string,
    cost: number,
    category: string,
    date: string,
    productId: number,
    units: number
}

interface RegisterProps {
    setAddmode: React.Dispatch<React.SetStateAction<string>>, 
    form: Products, 
    handleCategory: (e: string) => void,
    handleName: (e: string) => void,
    handlePrice: (e: number) => void,
    handleProductId: (e: number) => void,
    handleUnit: (e: number) => void,
    addProduct: () => void,
}

const Register = (props: RegisterProps) => {
    return(
        <div>   
        <h2 className="registerTitle">Cadastrar Produto</h2>
        <div className="registerDiv">
            <h1>Informações sobre o produto</h1>
            <h3>Favor inserir as informações relativas ao produto que deseja cadastrar.</h3>
            <div className="inputDiv">
                <div className="registerInput">
                    <p>Descrição</p>
                    <input placeholder="Descrição do produto" type="text" value={props.form?.name} onChange={(e) => props.handleName(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <p>Categoria</p>
                    <input placeholder="Categoria do produto" type="text" value={props.form?.category} onChange={(e) => props.handleCategory(e.target.value)}/>
                </div>
                <div className="registerInput">
                    <p>Código</p>
                    <input placeholder="Código do Produto" type="number" value={props.form?.productId} onChange={(e) => props.handleProductId(parseInt(e.target.value))}/>
                </div>
                <div className="registerInput">
                    <p>Valor</p>
                    <input placeholder="Valor do produto" type="number" value={props.form?.cost} onChange={(e) => props.handlePrice(parseFloat(e.target.value))}/>
                </div>
                <div className="registerInput">
                    <p>Quantiade</p>
                    <input placeholder="Quantidade do produto" type="number" value={props.form?.units} onChange={(e) => props.handleUnit(parseInt(e.target.value))}/>
                </div>
            </div>
        </div>
        <div className="registerDiv confirm">
            <div className="titleSection">
                <div>
                    <h1>Confirmação</h1>
                    <h3>Confira os dados antes de cadastrar o produto</h3>
                </div>
                <button className="addButton registerButton" onClick={() => props.addProduct()}>Cadastrar</button>
            </div>
        </div>
        </div>
    )
}

export default Register