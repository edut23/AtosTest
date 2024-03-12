import { useState } from "react"


const useMain = () => {
    const [page, setPage] = useState<string>('login')
    const [auth, setAuth] = useState<string>('');
    const [username, setUsername] = useState<string>('')

    return{
        page,
        setPage,
        auth,
        setAuth,
        username,
        setUsername
    }
}

export default useMain;