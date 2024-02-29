import useMenu from "../../../hook/useMenu"
import Item from "./item";
import './index.css';

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
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}

const Menu = ({setPage, data, setData}: MenuProps) => {
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
    } = useMenu({setPage, data, setData});

    return(
        <div>
            <div className="cardItem">
                {data?.products && data?.products.map((item, index) => 
                    <Item item={item} index={index} setPage={setPage} data={data} setData={setData}/>
                )}
                {addMode &&
                    <div>
                        <p className="itemInfo">Nome do produto:</p>
                        <div className="inputDiv">
                            <input type='text' title={form.name} value={form.name} onChange={e => handleName(e.target.value)}/>
                            {error.name && <p title='error' className="error">{error.name}</p>}
                        </div>
                        <p className="itemInfo">Preço:</p>
                        <div className="inputDiv">
                            <input type='number' value={form.price} onChange={e => handlePrice(parseFloat(e.target.value))}/>
                            {error.price && <p title='error' className="error">{error.price}</p>}
                        </div>
                        <p className="itemInfo">Fornecedor:</p>
                        <div className="inputDiv">
                            <input type='text' value={form.supplier} onChange={e => handleSupplier(e.target.value)}/>
                            {error.supplier && <p title='error' className="error">{error.supplier}</p>}
                        </div>
                        <p className="itemInfo">Id:</p>
                        <div className="inputDiv">
                            <input type='number' value={data?.products.length + 1} disabled={true}/>
                        </div>
                        <p className="itemInfo">Código de barras:</p>
                        <div className="inputDiv">
                            <input type='number' value={form.barcode} onChange={e => handleBarcode(parseInt(e.target.value))}/>
                            {error.barcode && <p title='error' className="error">{error.barcode}</p>}
                        </div>
                        <div className="buttonAddDiv">
                            <button className="button" onClick={() => setAddmode(false)}>
                                Cancelar
                            </button>
                            <button className="button" onClick={() => addProduct()}>
                                Salvar
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="buttonAddDiv">
                {!addMode && 
                <>
                    <button className="button add" onClick={() => setPage('login')}>Sair</button>
                    <button className="button add" onClick={() => setAddmode(true)}>Adicionar Produto</button>
                </>}
            </div>
        </div>
    )
}

export default Menu;