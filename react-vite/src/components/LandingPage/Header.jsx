import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from "../LoginFormModal";

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
                        <a className="smoothscroll" href="#home" title="home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#about" title="about">
                            About
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#features" title="features">
                            Upcoming Features
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#community" title="community">
                            Explore the Community
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#begin" title="begin" />
                    </li>
                </ul>
                {user ? (
                    <a
                        href="#"
                        title="log-out"
                        className="button button-primary cta"
                        onClick={handleLogout}
                    >
                        Log Out
                    </a>
                ) : (
                    <a
                        href="#"
                        title="log-in"
                        className="button button-primary cta"
                    >
                        <OpenModalMenuItem
                            itemText="Login"
                            modalComponent={<LoginFormModal />}
                        />
                    </a>
                )}
            </nav>
            {/* <a className="header-menu-toggle" href="#">
                <span>Menu</span>
            </a> */}
        </header>

    )
}

export default Header;
