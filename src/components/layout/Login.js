import React from "react";
import { authentication } from "../Firebase";

const signIn = async event => {
  event.preventDefault();
  const form = document.querySelector("#signup");
  const email = form.email.value;
  const password = form.password.value;
  await authentication(email, password);
};

const Login = () => {
  return (
    <form id="signup">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" required />
      <button id="login" onClick={signIn}>
        Log in
      </button>
    </form>
  );
};

export default Login;
