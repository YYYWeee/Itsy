import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";

import "./SignupForm.css";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [passwordErr, setPasswordErr] = useState({});
  const { closeModal } = useModal();

	useEffect(() => {
    const errorsObj = {};
    if (!username) errorsObj.username = "Username is required";
    if (!email) errorsObj.email = "Email is required";
    if (!firstName) errorsObj.firstName = "First name is required";
    if (!password) errorsObj.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }

    if (password.length < 6)
      errorsObj.passLength = "Password must be at least 6 characters";

    setFormErr(errorsObj);
  }, [username, email, firstName, lastName, password]);



	const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    if (Object.keys(formErr).length === 0) {
      if (password === confirmPassword) {
        setFormErr({});
        setPasswordErr({});
        const data = await dispatch(
          signUp({
            email: email.toLowerCase(),
            username,
            first_name: firstName,
            last_name: lastName,
            password,
          })
        );
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
        }
      } else {
        const errorsObj = {
          confirmPassword: "Confirm Password and Password must be the same",
        };
        setPasswordErr(errorsObj);
      }
    }
  };
	const disabled = password.length < 6 || username.length < 4 ? true : null;

	return (
    <div className="sign-wrap">
      <img
        src="https://projectpin.s3.amazonaws.com/e8a3ee1d37284526baea27cb9f7d1078.png"
        alt="Itsy"
        id="navigation-title-img"
      />
      <h1 className="welcome-sign">Create your account</h1>
      <div className="new-ideas">Registration is easy</div>
      <form className="sign-form" onSubmit={handleSubmit}>
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        {email.length < 4 && email.length > 0 && (
          <p className="sign-err">Please input a valid email</p>
        )}
        <label className="sign-label">
          Username
          <input
            className="sign-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.username && (
          <p className="sign-err">{formErr.username}</p>
        )}
        {username.length < 4 && username.length > 0 && (
          <p className="sign-err">Username must be at least 4 characters</p>
        )}

        <label className="sign-label">
          First Name
          <input
            className="sign-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.firstName && (
          <p className="sign-err">{formErr.firstName}</p>
        )}
        {firstName.length < 2 && firstName.length > 0 && (
          <p className="sign-err">First name is required</p>
        )}
        <label className="sign-label">
          Last Name
          <input
            className="sign-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type={visible1 ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div onClick={() => setVisible1(!visible1)} className="pwicon1">
            {visible1 ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </div>
        </label>
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        {password.length < 6 && password.length > 0 && (
          <p className="sign-err">Password must be at least 6 characters.</p>
        )}
        {didSubmit && passwordErr.confirmPassword && (
          <p className="sign-err">{passwordErr.confirmPassword}</p>
        )}
        <label className="sign-label">
          Confirm Password
          <input
            className="sign-input"
            type={visible2 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div onClick={() => setVisible2(!visible2)} className="pwicon1">
            {visible2 ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </div>
        </label>
        <button
          className={`continue-btn ${disabled ? "inactive" : ""}`}
          type="submit"
          disabled={disabled}
        >
          Continue
        </button>
        <div className="on-pinthis">
          <div className="not-on">Already a member? </div>
          <div className="switch-login">
            <OpenModalButton
              buttonText="Log in"
              modalComponent={<LoginFormModal />}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
