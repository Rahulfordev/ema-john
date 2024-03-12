import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import "firebase/auth";

const Login = () => {
  const [show, setShow] = useState(false);

  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        storeAuthToken(user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storeAuthToken = (user) => {
    user
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
        // Here you can store the token in localStorage or send it to your backend
      })
      .catch(function (error) {
        console.log("JWT Error", error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id=""
            required
          />
          <p onClick={() => setShow(!show)}>
            <small>
              {show ? <span>Hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <button onClick={handleSignInWithGoogle} className="text-center">
        Google
      </button>
      <p>
        <small>
          New to Ema-john? <Link to="/signup">Create New Account</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
