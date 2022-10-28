import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { useState } from "react";
// import { FormattedMessage } from "react-intl";
import { userService } from "../../services";
import Header from "../Header/Header";

function Login({ userLoginSuccess, isLoggedIn }) {
  const [userName, setUserName] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const data = await userService.handleLoginApi(userName, password);
      if (data && data.errCode !== 0) {
        console.log(data);

        setMessage(data.message);
      } else {
        setMessage("");

        userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data.message);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center login-title">Login</div>
            <div className="col-12 form-group">
              <label className="label-1">Username:</label>
              <input
                type="email"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="form-control input-login"
              />
            </div>
            <div className="col-12 form-group password">
              <label className="label-1">Password:</label>
              <input
                type={!isShow ? "password" : "text"}
                value={password}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control input-login"
              />
              <p className="show" onClick={() => setIsShow(!isShow)}>
                {!isShow ? "Show" : "Hidden"}
              </p>
              <div className="forgot">
                <a href="/" className="forgots">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div style={{ color: "red" }}>{message}</div>
            <button type="submit" className="btn" onClick={handleLogin}>
              Login
            </button>
            <div className="login-with">Or login with</div>
            <div className="app">
              <div className="google">Google</div>
              <div className="facebook">Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: function (userInfo) {
      dispatch(actions.userLoginSuccess(userInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
