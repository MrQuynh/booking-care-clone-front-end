import { connect } from "react-redux";
import "./HomeHeader.scss";
import React from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { Link } from "react-router-dom";

function HomeHeader({ isShowBanner, changeLanguageAppRedux, language }) {
  const changeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };
  return (
    <React.Fragment>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fa-solid fa-bars icon-menu" />
            <Link to="/home">
              <div className="header-logo"></div>
            </Link>
          </div>
          <div className="center-content">
            <Link to="/list-specialty" className="menu-item">
              <div className="title">
                <FormattedMessage id="home-header.speciality" />
              </div>
              <p className="detail">
                <FormattedMessage id="home-header.searchdoctor" />
              </p>
            </Link>
            <Link to="/list-clinic" className="menu-item">
              <div className="title">
                <FormattedMessage id="home-header.health-facility" />
              </div>
              <p className="detail">
                <FormattedMessage id="home-header.select-room" />
              </p>
            </Link>
            <Link to="/list-doctors" className="menu-item">
              <div className="title">
                <FormattedMessage id="home-header.doctor" />
              </div>
              <p className="detail">
                <FormattedMessage id="home-header.select-doctor" />
              </p>
            </Link>
            <Link to="/list-specialty" className="menu-item">
              <div className="title">
                <FormattedMessage id="home-header.fee" />
              </div>
              <p className="detail">
                <FormattedMessage id="home-header.check-health" />
              </p>
            </Link>
          </div>
          <div className="right-content">
            <i className="fa-solid fa-question icon-help"></i>
            <p>
              <FormattedMessage id="home-header.support" />
            </p>

            <div className="language">
              <p
                className={language === "vi" ? "active" : ""}
                onClick={() => changeLanguage(LANGUAGES.VI)}
              >
                VN
              </p>
              <p
                onClick={() => changeLanguage(LANGUAGES.EN)}
                className={language === "en" ? "active" : ""}
              >
                EN
              </p>
            </div>
          </div>
        </div>
      </div>
      {isShowBanner && (
        <div className="home-header-banner">
          <div className="title-body">
            <div className="title1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              <FormattedMessage id="banner.title2" />
            </div>
            <div className="title3">
              <i className="fa-solid fa-magnifying-glass icon-search"></i>
              <input className="input" placeholder="Tìm phòng khám" />
            </div>
          </div>
          <div className="options">
            <div className="title4">
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t1">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child1" />
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child11" />
                </p>
              </Link>
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t2">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child2" />
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child22" />
                </p>
              </Link>
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t3">
                  <i className="fa-solid fa-book"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child3" />
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child33" />
                </p>
              </Link>
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t4">
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child4" />{" "}
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child44" />
                </p>
              </Link>
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t5">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child5" />
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child55" />
                </p>
              </Link>
              <Link to="/list-specialty" className="title-item">
                <div className="title-image t6">
                  <i className="fa-solid fa-tooth"></i>
                </div>
                <p className="title-text">
                  <FormattedMessage id="banner.child6" />
                </p>
                <p className="title-text">
                  <FormattedMessage id="banner.child66" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
