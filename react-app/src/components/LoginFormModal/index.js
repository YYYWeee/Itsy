import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function navigate(url) {
  window.location.href = url;
}


function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const { closeModal } = useModal();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   } else {
  //       closeModal()
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    if (Object.keys(formErr).length === 0) {
      const data = await dispatch(login({ email, password }));
      if (data) {
        const flattenedData = {};
        data.forEach((item) => {
          const [key, value] = item.split(" : ");
          flattenedData[key.trim()] = value.trim();
        });
        setFormErr(flattenedData);
      } else {
        closeModal();
        history.push("/listings");
        return null;
      }
    }
  };


  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setFormErr({});
    setDidSubmit(true);

    await dispatch(login({ email, password }));

    setErrors([]);
    closeModal();
    history.push("/listings");
  };

  const disabled = password.length < 6 || email.length < 4 ? true : null;




  useEffect(() => {
    const errorsObj = {};

    if (!email) errorsObj.logEmail = "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.logEmail = "Please enter a valid email address";
    }

    setFormErr(errorsObj);
  }, [email, password]);


  const loginThroughGoogle = async () => {
    const response = await fetch("/google-login-proxy");
    const data = await response.json();
    console.log(data);
    navigate(data.url);
    // window.open(data.url, "_blank", "width=600,height=600");

  };


//   const loginThroughGoogle = async () => {
//     try {
//         const response = await fetch("/googlelogin", {
//             method: 'GET',

//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (response.ok) {
//             // Redirect the user to the authorization URL returned by the backend
//             const { url } = await response.json();
//             window.location.href = url;
//         } else {
//             throw new Error('Failed to initiate Google login');
//         }
//     } catch (error) {
//         console.error('Error logging in through Google:', error);
//     }
// };






  return (
    <div className="log-wrap">
      <img
        src="https://projectpin.s3.amazonaws.com/e8a3ee1d37284526baea27cb9f7d1078.png"
        alt="Itsy"
        id="navigation-title-img"
      />
      <div className="welcome-sign">Welcome to Itsy</div>
      <form className="log-form" onSubmit={handleSubmit}>
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {email.length < 4 && email.length > 0 && (
          <p className="sign-err">Please input a valid email</p>
        )}
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        {didSubmit && formErr.logEmail && (
          <p className="sign-err">{formErr.logEmail}</p>
        )}

        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type={visible1 ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setVisible1(!visible1)} className="pwicon">
            {visible1 ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </div>
        </label>
        {password.length < 6 && password.length > 0 && (
          <p className="sign-err">Password must be at least 6 characters.</p>
        )}
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        <button
          className={`continue-btn ${disabled ? "inactive" : ""}`}
          disabled={disabled}
          type="submit"
        >
          Log In
        </button>
        <button className="demo-btn" onClick={demoUser}>
          Demo User
        </button>
        <div className="on-itsy">
          <div className="not-on">Not on Itsy yet?</div>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
        <div className="google-login" onClick={loginThroughGoogle} >
          <img className="google-auth-img" src='https://projectpin.s3.amazonaws.com/1c1f6ddaf6d740b2bbc4bb57d9d2c9ea.png' alt='google sign in' />
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
