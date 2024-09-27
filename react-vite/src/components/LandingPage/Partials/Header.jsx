import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from '../../../redux/session';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import LoginFormModal from '../../LoginFormModal';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
    };

    return (
        <header id="header" className="row">
            <div className="header-logo">
                <a href="/">Lorebound</a>
            </div>
            <nav id="header-nav-wrap">
                <ul className="header-main-nav">
                    <li className="current">
                        <a href="#home" title="home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" title="about">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#features" title="features">
                            Upcoming Features
                        </a>
                    </li>
                    <li>
                        <a href="#community" title="community">
                            Explore the Community
                        </a>
                    </li>
                    <li>
                        <a href="#begin" title="begin" />
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
