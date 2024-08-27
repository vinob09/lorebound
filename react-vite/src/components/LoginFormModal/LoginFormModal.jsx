import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      closeModal();
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
      </form>
    </>
  );
}

export default LoginFormModal;
