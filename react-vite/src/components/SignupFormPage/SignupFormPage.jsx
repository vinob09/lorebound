import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import Loader from "../Loader/Loader";
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoaded(true);
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
    setIsLoaded(false);
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-section">
        <h1 className="signup-page-title">Sign Up</h1>
        {errors.server && <p className="signup-page-errors">{errors.server}</p>}
        <form onSubmit={handleSubmit} className="signup-page">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="signup-page-errors">{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="signup-page-errors">{errors.username}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="signup-page-errors">{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className="signup-page-errors">{errors.confirmPassword}</p>}
          <button type="submit" className="signup-page-submit">Sign Up</button>
          {isLoaded && <Loader />}
        </form>
      </div>
      <div className="signup-page-image-section">
        <img src="/lorebound-book.png" alt="Signup Illustration" />
      </div>
    </div>
  );
}

export default SignupFormPage;
