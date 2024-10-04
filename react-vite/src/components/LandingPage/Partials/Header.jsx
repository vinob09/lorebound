import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from '../../../redux/session';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import LoginFormModal from '../../LoginFormModal';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
    };

    // func to handle scroll spy logic
    const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        let currentSection = 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 72) {
                currentSection = section.getAttribute('id');
            }
        });

        setActiveSection(currentSection);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header id="header" className="row">
            <div className="header-logo">
                <a href="/">Lorebound</a>
            </div>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>
            <nav id="header-nav-wrap">
                <ul className="header-main-nav">
                    <li className={activeSection === 'home' ? 'current' : ''}>
                        <a href="#home" title="home">
                            Home
                        </a>
                    </li>
                    <li className={activeSection === 'about' ? 'current' : ''}>
                        <a href="#about" title="about">
                            About
                        </a>
                    </li>
                    <li className={activeSection === 'features' ? 'current' : ''}>
                        <a href="#features" title="features">
                            Features & Community
                        </a>
                    </li>
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
