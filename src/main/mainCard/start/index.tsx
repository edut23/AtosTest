import AtosLogo from '../../../assets/atosLogo';
import './index.css';
import Login from './login';
import SignUp from './signUp';

interface Products{
    id: number,
    name: string,
    price: number,
    supplier: string,
    barcode: number,
}

interface StartProps{
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>
    setAuth: React.Dispatch<React.SetStateAction<string>>
}

const Start = ({page, setPage, setAuth}: StartProps) => {

    return(
        <div className={page !== 'menu'  ? 'startCard' : 'menu'}>
            {page === 'login' && <Login setPage={setPage} setAuth={setAuth}/>}
            {page === 'signup' && <SignUp setPage={setPage} setAuth={setAuth}/>}
            <div className='bottonLogo'>
                <AtosLogo/>
            </div>
        </div>
    )
}

export default Start;