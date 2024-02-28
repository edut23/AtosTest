import { useState } from "react"

const useMain = () => {
    const [page, setPage] = useState<string>('login')

    return{
        page,
        setPage
    }
}

export default useMain;