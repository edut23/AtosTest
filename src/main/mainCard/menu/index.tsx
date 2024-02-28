import useMenu from "../../../hook/useMenu"
import Item from "./item";

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

interface MenuProps{
    setPage: React.Dispatch<React.SetStateAction<string>>,  
    products: Data,
    setData: React.Dispatch<React.SetStateAction<Data>>
}

const Menu = ({setPage, products, setData}: MenuProps) => {
    const {
        name,
        setName,
        price,
        setPrice,
        supplier,
        setSupplier,
        barcode,
        setBarcode,
        addMode,
        setAddmode,
        addProduct,
    } = useMenu({setPage, products, setData});

    return(
        <div>
            <div>
                {products?.products && products?.products.map((item, index) => 
                    <Item item={item} index={index} setPage={setPage} products={products} setData={setData}/>
                )}
                {addMode &&
                    <div>
                        <p>Nome do produto:</p>
                        <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                        <p>Preço:</p>
                        <input type='number' value={price} onChange={e => setPrice(parseFloat(e.target.value))}/>
                        <p>Fornecedor:</p>
                        <input type='text' value={supplier} onChange={e => setSupplier(e.target.value)}/>
                        <p>Id:</p>
                        <input type='number' value={products?.products?.length + 1} disabled={true}/>
                        <p>Código de barras:</p>
                        <input type='number' value={barcode} onChange={e => setBarcode(parseInt(e.target.value))}/>
                        <button onClick={() => setAddmode(false)}>
                            Cancelar
                        </button>
                        <button onClick={() => addProduct()}>
                            Salvar
                        </button>
                    </div>
                }
            </div>
            <button onClick={() => setAddmode(!addMode)}>Adicionar Produto</button>
        </div>
    )
}

export default Menu;