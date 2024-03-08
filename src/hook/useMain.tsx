import { useState } from "react"


const useMain = () => {
    const [page, setPage] = useState<string>('login')
    const [auth, setAuth] = useState<string>('');

    return{
        page,
        setPage,
        auth,
        setAuth
    }
}

export default useMain;