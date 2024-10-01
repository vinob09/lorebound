import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { thunkLogout } from '../../redux/session';
import SearchBar from './SearchBar';
import ClientNav from './ClientNav';
import './TopNav.css';

const TopNav = ({ userId }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navRef = useRef(null);
    const location = useLocation();

    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    // handle logout
    const logout = () => {
        dispatch(thunkLogout()).then(() => navigate("/"));
    };

    // toggle sidebar nav
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            // adjust state for mobile/tablet breakpoints
            if (window.innerWidth <= 1024) {
                setIsMobileOrTablet(true);
            } else {
                setIsMobileOrTablet(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const handleClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div className='top-nav'>
            <div className='menu-icon' onClick={toggleNav}>
                <TiThMenu />
            </div>
            <div className='search-bar'><SearchBar /></div>

            {!isMobileOrTablet && (
                <div className='top-nav-links'>
                    <Link to={`/client/${userId}`} className={location.pathname === `/client/${userId}` ? "active" : ""}>DASHBOARD</Link>
                    <Link to={`/client/${userId}/notes`} className={location.pathname === `/client/${userId}/notes` ? "active" : ""}>NOTES</Link>
                    <Link to={`/client/${userId}/characters`} className={location.pathname === `/client/${userId}/characters` ? "active" : ""}>CHARACTERS</Link>
                    <Link onClick={logout}>LOGOUT</Link>
                </div>
            )}

            {isNavOpen && (
                <div className='sidebar' ref={navRef}>
                    <ClientNav isMobileOrTablet={isMobileOrTablet}/>
                </div>
            )}
        </div>
    )
};

export default TopNav;
