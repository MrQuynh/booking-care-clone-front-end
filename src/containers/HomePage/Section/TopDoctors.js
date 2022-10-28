import { connect } from "react-redux";
import { LANGUAGE, LANGUAGES } from "../../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./TopDoctor.scss";
import { getAllSpecialty } from "../../../services/userService";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function TopDoctors({ gray, title, btnType, hasDoctor, language, data }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  const [listData, setListData] = useState([]);
  useEffect(() => {
    getAllSpecialty().then((data) => {
      if (data && data.errCode === 0) {
        setListData(data.data);
      }
    });
  }, []);

  return (
    <div className={gray ? "specialtys gray" : "specialtys"}>
      <div className="content">
        <div className="title-spec">{title}</div>
        <div className="body1">
          <Slider {...settings}>
            {data &&
              data.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div className="item-image" key={index}>
                    <img className="image1" src={imageBase64} alt="1" />
                    <Link
                      to={`/detail-doctor?id=${item.id}`}
                      className="info-doctor"
                    >
                      <div className="text-image">
                        {language === LANGUAGES.VI
                          ? item.positionData.valueVi
                          : item.positionData.valueEn}
                      </div>
                      <div className="text-image">{`${item.lastName} ${item.firstName} `}</div>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </div>
        <Link to="/list-doctors">
          <div className="see-more">{btnType}</div>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopDoctors);
