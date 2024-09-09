import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      if (user && user.id){
        navigate(`/client/${user.id}`);
      }
    }
  };

  // clear error messages on input change
  const handleInputChange = (field) => (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    if (field === "email") setEmail(e.target.value);
    if (field === "username") setUsername(e.target.value);
    if (field === "password") setPassword(e.target.value);
    if (field === "confirmPassword") setConfirmPassword(e.target.value);
  };

  // check for all fields populated
  const isFormValid = email && username && password && confirmPassword;

  return (
    <>
      <h1 className="signup-form-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form-modal">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={handleInputChange("email")}
            required
          />
        </label>
        {errors.email && <p className="signup-form-errors">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={handleInputChange("username")}
            required
          />
        </label>
        {errors.username && <p className="signup-form-errors">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={handleInputChange("password")}
            required
          />
        </label>
        {errors.password && <p className="signup-form-errors">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            required
          />
        </label>
        {errors.confirmPassword && <p className="signup-form-errors">{errors.confirmPassword}</p>}
        <button type="submit" className="signup-submit" disabled={!isFormValid}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
