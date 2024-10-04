import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from '../../../redux/session';
import { TiThMenu } from 'react-icons/ti';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import LoginFormModal from '../../LoginFormModal';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
    };

    // toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            // adjust state for mobile/tablet breakpoints
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('#header-nav-wrap') && !event.target.closest('.mobile-menu-toggle')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <header id="header" className="row">
            <div className="header-logo">
                <a href="/">Lorebound</a>
            </div>

            {isMobile && (
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <TiThMenu />
                </button>
            )}

            <nav id="header-nav-wrap" className={isMobile && mobileMenuOpen ? 'active' : ''}>
                <ul className="header-main-nav">
                    <li><a href="#home" title="home">Home</a></li>
                    <li><a href="#about" title="about">About</a></li>
                    <li><a href="#features" title="features">Features & Community</a></li>
                </ul>
                {user ? (
                    <button className="button button-primary cta" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="button button-primary cta">
                        <OpenModalMenuItem
                            itemText="Login"
                            modalComponent={<LoginFormModal />}
                        />
                    </button>
                )}
            </nav>

        </header>
    )
};

export default Header;
