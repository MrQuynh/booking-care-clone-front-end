import React from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { useEffect } from "react";
import _ from "lodash";
import { useState } from "react";

function Header({ changeLanguageAppRedux, language, processLogout, userInfo }) {
  const handleChangeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };

  const [menuApp, setMenuApp] = useState([]);

  useEffect(() => {
    if (userInfo && !_.isEmpty(userInfo)) {
      const role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        setMenuApp(adminMenu);
      } else if (role === USER_ROLE.DOCTOR) {
        setMenuApp(doctorMenu);
      }
    }
  }, []);
  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={menuApp} />
      </div>

      <div className="languages">
        <span className="welcome">
          <FormattedMessage id="home-header.welcome" />,{" "}
          {userInfo && userInfo.firstName}!
        </span>
        <span
          className={
            language === LANGUAGES.VI ? "language-vi active" : "language-vi"
          }
          onClick={() => handleChangeLanguage(LANGUAGES.VI)}
        >
          VN
        </span>
        <span
          className={
            language === LANGUAGES.EN ? "language-en active" : "language-en"
          }
          onClick={() => handleChangeLanguage(LANGUAGES.EN)}
        >
          EN
        </span>

        <div className="btn btn-logout" onClick={processLogout} title="Log out">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>

      {/* nút logout */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
