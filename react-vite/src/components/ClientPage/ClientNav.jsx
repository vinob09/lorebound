import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';
import './ClientNav.css';

const ClientNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    // handle logout
    const logout = () => {
        dispatch(thunkLogout())
            .then(() => {
                navigate("/")
            })
    };

    return (
        <>
            <div className='client-nav-welcome'>
                {user ? <p>{user.username}&apos;s Menu</p> : <p>Menu</p>}
            </div>
            <input type='text' placeholder='Search' className='client-nav-search' />
            <button className='client-nav-button'>New Character</button>
            <button className='client-nav-button'>New Note</button>
            <div className='client-nav-section'>
                <h3>Characters</h3>
                <ul>
                    <li><a href='#'>Character_1</a></li>
                    <li><a href='#'>Character_2</a></li>
                    <li><a href='#'>Character_3</a></li>
                </ul>
            </div>
            <div className='client-nav-section'>
                <h3><Link to={`/client/${user.id}/notes`}>Grimoires</Link></h3>
                <ul>
                    <li><a href='#'>Note_1</a></li>
                    <li><a href='#'>Note_2</a></li>
                    <li><a href='#'>Note_3</a></li>
                </ul>
            </div>
            <button className='client-nav-logout' onClick={logout}>Logout</button>
        </>
    )
};

export default ClientNav;
