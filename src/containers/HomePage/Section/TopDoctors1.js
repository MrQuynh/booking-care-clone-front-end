import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";

import "./Specialty.scss";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";

function TopDoctors({ gray, title, btnType, hasDoctor, data, language }) {
  const history = useHistory();
  const handleViewDetailDoctor = (doctor) => {
    console.log("view info:", doctor);
    history.push(`/detail-doctor?id=${doctor.id}`);
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className={gray ? "specialty gray" : "specialty"}>
      <div className="content">
        <div className="title-spec">{title}</div>
        {/* <div className="body-spec"> */}
        <Slider {...settings}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div
                  key={index}
                  className={hasDoctor ? "item item-doctor" : "item"}
                  onClick={() => handleViewDetailDoctor(item)}
                >
                  <div className="image-item">
                    <img
                      className={hasDoctor ? "image-doctor" : "image"}
                      alt="anh"
                      src={imageBase64}
                    />
                  </div>
                  <h3 className="text-item doctor-name">
                    <div>{`${item.lastName} ${item.firstName} `}</div>
                    <div>
                      {language === LANGUAGES.VI
                        ? item.positionData.valueVi
                        : item.positionData.valueEn}
                    </div>
                  </h3>
                </div>
              );
            })}
        </Slider>
        {/* </div> */}
        <div className="icon-back">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="icon-next">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="see-more">{btnType}</div>
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
