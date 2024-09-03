import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) {
      closeModal();
      navigate(`/client/${user.id}`);
    }
  }, [user, navigate, closeModal]);

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
      navigate(`/client/${user.id}`)
    }
  };

  // clear error messages on input change
  const handleInputChange = (field) => (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    if (field === "email") setEmail(e.target.value);
    if (field === "password") setPassword(e.target.value);
  };

  // check for all fields populated
  const isFormValid = email && password;

  // handle demo user
  const handleDemo = async (e) => {
    e.preventDefault();

    try {
      await dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    } catch (err) {
      if (err && err.errors) {
        setErrors(err.errors)
      } else {
        setErrors({ email: 'Unsuccessful Demo Login' })
      }
    }
  }

  return (
    <>
      <h1 className="login-form-title">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form-modal">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={handleInputChange("email")}
            required
          />
        </label>
        {errors.email && <p className="login-form-errors">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handleInputChange("password")}
            required
          />
        </label>
        {errors.password && <p className="login-form-errors">{errors.password}</p>}
        <button type="submit" className="login-submit" disabled={!isFormValid}>Log In</button>
        <a href="#" className="demo-user-link" onClick={handleDemo}>Demo User</a>
      </form>
    </>
  );
}

export default LoginFormModal;
