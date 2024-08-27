import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { thunkLogout } from '../../redux/session';
import './ClientNav.css';

const ClientNav = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    // handle sidebar toggle
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // handle logout
    const logout = () => {
        dispatch(thunkLogout())
            .then(() => {
                navigate("/")
            })
    };

    useEffect(() => {
        const handleClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, []);

    return (
        <div className='client-nav'>
            <div className='client-nav-header'>
                <div className='client-menu-icon' onClick={toggleNav}>
                    <TiThMenu />
                </div>
                <Link to="/">HOME</Link>
            </div>

            {isNavOpen && (
                <div className='client-nav-sidebar' ref={navRef}>
                    <div className='client-nav-welcome'>
                        {user ? <p>{user.username}&apos;s Menu</p> : <p>Menu</p>}
                    </div>
                    <input type='text' placeholder='Search' className='client-nav-search'/>
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
                        <h3>Grimoires</h3>
                        <ul>
                            <li><a href='#'>Note_1</a></li>
                            <li><a href='#'>Note_2</a></li>
                            <li><a href='#'>Note_3</a></li>
                        </ul>
                    </div>
                    <button className='client-nav-logout' onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
};

export default ClientNav;
