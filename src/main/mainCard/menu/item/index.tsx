import useItem from "../../../../hook/useItem";

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
    userId: number
}

interface Data{
    id: number,
    products: Products[],
}

interface ItemProps{
    item: Products,
    index: number,
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    products: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}


const Item = ({item, index, setPage, products, setData}: ItemProps) => {
    const {
        name,
        setName,
        price,
        setPrice,
        supplier,
        setSupplier,
        barcode,
        setBarcode,
        editMode,
        setEditMode,
        editProduct,
        cancelEdit
    } = useItem({item, products, setData});

    return(
        <div>
            <p>Nome do produto:</p>
            <input type='text' value={name} onChange={e => setName(e.target.value)} disabled={!editMode}/>
            <p>Preço:</p>
            <input type='number' value={price} onChange={e => setPrice(parseFloat(e.target.value))} disabled={!editMode}/>
            <p>Fornecedor:</p>
            <input type='text' value={supplier} onChange={e => setSupplier(e.target.value)} disabled={!editMode}/>
            <p>Id:</p>
            <input type='number' value={item.id} disabled={true}/>
            <p>Código de barras:</p>
            <input type='number' value={barcode} onChange={e => setBarcode(parseInt(e.target.value))} disabled={!editMode}/>
            <button onClick={() => {editMode ? editProduct(index)  : setEditMode(!editMode)}}>
                {editMode ? "Salvar" : "Editar produto"}
            </button>
            {editMode && 
            <button onClick={() => cancelEdit()}>
                Cancelar
            </button>}
        </div>
    )
}

export default Item;