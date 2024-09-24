import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          {user ? (
            <a href={`/client/${user.id}`} className="nav-link">
              Dashboard
            </a>
          ) : (
            <a href="/" className="nav-link">
              Lorebound
            </a>
          )}
        </li>

        <li>
          {user ? (
            <button className="nav-button" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button className="nav-button">
              <OpenModalMenuItem
                itemText="Login"
                modalComponent={<LoginFormModal />}
              />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
