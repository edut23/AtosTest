import useMain from '../../hook/useMain';
import './index.css';
import Menu from './menu';
import Start from './start';
import StartImage from '../../assets/startImage';

const MainCard = () => {
    const {page, setPage, auth, setAuth} = useMain();

    return(
        <div className='main'>
            {auth === '' && 
            <>
                <Start page={page} setPage={setPage} setAuth={setAuth}/>
                <StartImage/>
            </>}
            {auth !== '' && <Menu setPage={setPage} auth={auth}/>}
        </div>
    )
}

export default MainCard;