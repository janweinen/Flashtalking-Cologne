import React, { useState } from "react";
import { authentication } from "../Firebase";
import styled from "styled-components";
import Background from "../../assets/images/ft_bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = styled.main`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #374047;
  background-image: url(${Background});
  background-size: cover;
`;

const Headline = styled.h1`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin: 0;
  line-height: 20px;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const Span = styled.span`
  font-weight: 400;
  font-size: 20px;
`;

const LoginContainer = styled.div`
  position: absolute;
  width: 400px;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
`;

const Input = styled.input`
  display: block;
  background-color: #fff;
  color: #374047;
  border: 1px solid #aeb2b5;
  border-radius: 3px;
  width: 100%;
  display: inline-block;
  padding: 0 1rem 0 0.75rem;
  line-height: 2.125rem;
  min-height: calc(2.125rem + 2px);
  margin-bottom: 1.5em;
`;

const LoginButton = styled.button`
  position: relative;
  border: none;
  width: 100%;
  font-size: 12px;
  cursor: pointer;
  color: #ffffff;
  background-color: #bcbec1;
  padding: 20px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  &:hover {
    background-color: #aaaaaa;
  }

  &:active {
    background-color: #888888;
  }

  &:focus {
    outline: none;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 1.5em;
`;

const Spinner = styled(FontAwesomeIcon)`
  color: #ffffff;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const signIn = async event => {
    setLoading(true);
    event.preventDefault();
    const form = document.querySelector("#signup");
    const email = form.email.value;
    const password = form.password.value;
    await authentication(email, password);
  };
  return (
    <Main>
      <LoginContainer>
        <Headline>
          flashtalking<Span>cologne</Span>
        </Headline>
        <Fieldset>
          <form id="signup">
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" />
            <label htmlFor="password">Password:</label>
            <Input type="password" id="password" required />
          </form>
        </Fieldset>
        <LoginButton id="login" onClick={signIn}>
          <div>
            {loading ? (
              <Spinner icon={["fas", "circle-notch"]} spin />
            ) : (
              <div>LOGIN</div>
            )}
          </div>
        </LoginButton>
      </LoginContainer>
    </Main>
  );
};

export default Login;
