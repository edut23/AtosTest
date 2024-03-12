import AtosLogo from '../../../assets/atosLogo';
import './index.css';
import Login from './login';
import SignUp from './signUp';

interface StartProps{
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>
    setAuth: React.Dispatch<React.SetStateAction<string>>
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

const Start = ({page, setPage, setAuth, setUsername}: StartProps) => {

    return(
        <div className={page !== 'menu'  ? 'startCard' : 'menu'}>
            {page === 'login' && <Login setPage={setPage} setAuth={setAuth} saveUsername={setUsername}/>}
            {page === 'signup' && <SignUp setPage={setPage} setAuth={setAuth} setUsername={setUsername}/>}
            <div className={`bottonLogo ${page}`}>
                <AtosLogo/>
            </div>
        </div>
    )
}

export default Start;