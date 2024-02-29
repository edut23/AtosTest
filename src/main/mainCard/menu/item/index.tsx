import useItem from "../../../../hook/useItem";
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

interface ItemProps{
    item: Products,
    index: number,
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    data: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}


const Item = ({item, index, setPage, data, setData}: ItemProps) => {
    const {
        form,
        handleName,
        handlePrice,
        handleSupplier,
        handleBarcode,
        editMode,
        setEditMode,
        editProduct,
        error,
        cancelEdit
    } = useItem({item, data, setData});

    return(
        <div className="itemDiv">
            <p className="itemInfo">Nome do produto:</p>
            <div className="inputDiv">
                <input type='text' title={form.name} value={form.name} onChange={e => handleName(e.target.value)} disabled={!editMode}/>
                {error.name && <p title='error' className="error">{error.name}</p>}
            </div>
            <p className="itemInfo">Preço:</p>
            <div className="inputDiv">
                <input type='number' value={form.price} onChange={e => handlePrice(parseFloat(e.target.value))} disabled={!editMode}/>
                {error.price && <p title='error' className="error">{error.price}</p>}
            </div>
            <p className="itemInfo">Fornecedor:</p>
            <div className="inputDiv">    
                <input type='text' value={form.supplier} onChange={e => handleSupplier(e.target.value)} disabled={!editMode}/>
                {error.supplier && <p title='error' className="error">{error.supplier}</p>}
            </div>
            <p className="itemInfo">Id:</p>
            <div className="inputDiv"> 
                <input type='number' value={item.id} disabled={true}/>
            </div>
            <p className="itemInfo">Código de barras:</p>
            <div className="inputDiv">
                <input type='number' value={form.barcode} onChange={e => handleBarcode(parseInt(e.target.value))} disabled={!editMode}/>
                {error.barcode && <p title='error' className="error">{error.barcode}</p>}
            </div>
            <div className="buttonItemDiv">
                <button className="button" onClick={() => {editMode ? editProduct(index)  : setEditMode(!editMode)}}>
                    {editMode ? "Salvar" : "Editar produto"}
                </button>
            {editMode && 
                <button className="button" onClick={() => cancelEdit()}>
                    Cancelar
                </button>
            }
            </div>
        </div>
    )
}

export default Item;