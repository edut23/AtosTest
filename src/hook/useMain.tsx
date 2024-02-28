import { useState } from "react"

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

const useMain = () => {
    const [page, setPage] = useState<string>('login')
    const [data, setData] = useState<Data>({
        id: 0,
        user: '',
        password: '',
        name: '',
        cpf: '',
        birth: '',
        products: [],
    });

    return{
        page,
        setPage,
        data,
        setData
    }
}

export default useMain;