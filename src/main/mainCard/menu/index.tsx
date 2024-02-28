import useMenu from "../../../hook/useMenu"
import Item from "./item";

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
    } = useMenu({setPage, data, setData});

    return(
        <div>
            <div>
                {data?.products && data?.products.map((item, index) => 
                    <Item item={item} index={index} setPage={setPage} data={data} setData={setData}/>
                )}
                {addMode &&
                    <div>
                        <p>Nome do produto:</p>
                        <input type='text' title={name} value={name} onChange={e => setName(e.target.value)}/>
                        <p>Preço:</p>
                        <input type='number' value={price} onChange={e => setPrice(parseFloat(e.target.value))}/>
                        <p>Fornecedor:</p>
                        <input type='text' value={supplier} onChange={e => setSupplier(e.target.value)}/>
                        <p>Id:</p>
                        <input type='number' value={data?.products?.length + 1} disabled={true}/>
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
            {!addMode && <button onClick={() => setAddmode(true)}>Adicionar Produto</button>}
        </div>
    )
}

export default Menu;