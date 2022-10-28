import { connect } from "react-redux";
import { LANGUAGE, LANGUAGES } from "../../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./Specialty.scss";
import { getAllClinic } from "../../../services/userService";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Specialty1({ gray, title, btnType, hasDoctor, language }) {
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
    getAllClinic().then((data) => {
      if (data && data.errCode === 0) {
        setListData(data.data);
      }
    });
  }, []);

  return (
    <div className={gray ? "specialty gray" : "specialty"}>
      <div className="content">
        <div className="title-spec">{title}</div>
        <div className="body1">
          <Slider {...settings}>
            {listData &&
              listData.map((item, index) => (
                <div className="item-image" key={index}>
                  <Link to={`/detail-clinic?id=${item.id}`}>
                    <img className="image1" src={item.image} alt="1" />

                    <p className="text-image">{item.name}</p>
                  </Link>
                </div>
              ))}
          </Slider>
        </div>
        <Link to="/list-clinic">
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty1);
