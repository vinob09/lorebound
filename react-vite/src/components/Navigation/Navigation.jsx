import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ className }) {
  const user = useSelector(state => state.session.user);

  return (
    <nav className={`navbar ${className}`}>
      <ul className="navbar-nav">
        <li className="nav-item">
          {user ? (
            <a className="nav-link" href={`/client/${user.id}`}>
              Dashboard
            </a>
          ) : (
            <a className="nav-link" href="/">
              Home
            </a>
          )}
        </li>
        <li className="nav-item">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
