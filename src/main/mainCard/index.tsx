import useMain from '../../hook/useMain';
import './index.css';
import Login from './login';
import SignUp from './signUp';
import Menu from './menu';

const MainCard = () => {
    const {page, setPage, data, setData} = useMain();

    return(
        <div className='main'>
            {page === 'login' && <Login setPage={setPage} setData={setData}/>}
            {page === 'signup' && <SignUp setPage={setPage}/>}
            {page === 'menu' && <Menu setPage={setPage} data={data} setData={setData}/>}
        </div>
    )
}

export default MainCard;