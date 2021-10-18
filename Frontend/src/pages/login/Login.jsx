import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

export default function Login() {
  const history= useHistory()
  const log=()=>{
    history.push("/register");
  }
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const fillGuestCredentials = (e) => {
    e.target.form[0].value = "guest@gmail.com";
    e.target.form[1].value = "guest1";
  };

  return (

    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Career Chats</h3>
          <span className="loginDesc">
          Connect with friends , share your learnings, opportunities and discuss with each other.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit = {(e) => handleClick(e)}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" onClick={fillGuestCredentials}>Login as Guest</button>
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            
          </form>
          <button className="loginRegisterButton" onClick={log}>New User ? Sign up</button>
        </div>
      </div>
    </div>
  );
}
