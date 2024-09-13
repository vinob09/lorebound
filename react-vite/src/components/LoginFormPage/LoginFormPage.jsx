import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./LoginFormPage.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // check for all fields populated
  useEffect(() => {
    if (email && password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [password, email]);

  if (sessionUser) return <Navigate to={`/client/${sessionUser.id}`} replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate(`/client/${sessionUser.id}`);
    }
    setIsLoaded(false);
  };

  return (
    <div className="login-page-container">
      <div className="login-page-section">
        <h1 className="login-page-title">Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message} className="login-page-errors">{message}</p>)}
        <form onSubmit={handleSubmit} className="login-page">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="login-page-errors">{errors.email}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="login-page-errors">{errors.password}</p>}
          <button type="submit" className="login-page-submit" disabled={!isFormValid}>Log In</button>
          {isLoaded && <Loader />}
        </form>
      </div>
      <div className="login-page-image-section">
        <img src="/hand-scribble.png" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default LoginFormPage;
