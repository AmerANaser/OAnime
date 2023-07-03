// collection of your components page
import axios from "axios";
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function SignUp() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await axios.post("http://localhost:9000/users", {
        username,
        password,
        email
      });

      await axios.post("http://localhost:9000/posts", {
        userId: user.id,
        post: [],
      });
      // navigate to the sign in
      console.log("done");
    } catch (err) {
      console.log(err);
    }

    validateEmail();
    validatePassword();

    // Additional logic for submitting the form if validation passes
    if (!emailError && !passwordError) {
      // Submit the form or perform other actions
      console.log("Form submitted");
    }
    navigate("/home");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  return (
    <section className="containerOfContainer">
      <section className="container-signUp">
        <h1> Sign Up</h1>
        <form className="form-signUp" onSubmit={handleSubmit}>
          <input
            className="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="username"
          />
          <div className="emailerror">
            <input
              className="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
              placeholder="Email"
            />{" "}
            <br /> {emailError && <div className="error">{emailError}</div>}
          </div>

          <div className="passworerror">
            <input
              className="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              required
              placeholder="Password"
            ></input>
            <label htmlFor="" id="password error">
              {passwordError && <div className="error">{passwordError}</div>}
            </label>
          </div>
          <button className="signUpButton">Sign Up </button>
          <div className="word">
            Already have an account ?{" "}
            <Link to={"/"}>
              <span className="already-signIn">SignIn</span>
            </Link>
          </div>
        </form>
      </section>
    </section>
  );
}

export default SignUp;
