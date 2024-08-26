import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#!">
            Home
          </a>
        </li>
        <li className="nav-item">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
