import { useState } from "react"

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

const useMain = () => {
    const [page, setPage] = useState<string>('login')
    const [data, setData] = useState<Data>({id: 0, products: []})

    return{
        page,
        setPage,
        data,
        setData
    }
}

export default useMain;