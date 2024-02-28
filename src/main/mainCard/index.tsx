import useMain from '../../hook/useMain';
import './index.css';
import Login from './login';
import SignUp from './signUp';
import Menu from './menu';

const MainCard = () => {
    const {page, setPage} = useMain();

    return(
        <div className='main'>
            {page === 'login' && <Login setPage={setPage}/>}
            {page === 'signup' && <SignUp setPage={setPage}/>}
            {page === 'menu' && <Menu setPage={setPage}/>}
        </div>
    )
}

export default MainCard;