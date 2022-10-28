// import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router";

import { useEffect } from "react";
import { useState } from "react";
import "./DetailClinic.scss";
import { getDetailClinic } from "../../../services/userService";

import _ from "lodash";
import HomeHeader from "../../HomePage/HomeHeader";
import FooterHeader from "../../HomePage/FooterHeader";
function DetailClinic() {
  const match = useLocation();
  const query = new URLSearchParams(match.search);
  const id = query.get("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDetailClinic(id).then((data) => {
      if (data.errCode === 0) {
        setData(data.data);
      }
    });
  }, [id]);

  return (
    <div>
      <HomeHeader />
      <div className="c-container">
        <div
          className="c-image"
          style={{
            "background-image": `url(${data.image})`,
          }}
        ></div>
        <div className="c-avatar">
          <img src={data.image} />
          <div className="info-clinic">
            <div className="c-name">{data.name}</div>
            <div className="c-address">
              <i className="fa-solid fa-location-dot"></i>
              {data.address}
            </div>
          </div>
        </div>
        <div className="c-header">
          <p>GIỚI THIỆU</p>
          <p>THẾ MẠNH CHUYÊN MÔN</p>
          <p>VỊ TRÍ</p>
          <p>QUY TRÌNH ĐI KHÁM</p>
        </div>
        <div className="c-content">
          <div className="c-title">GIỚI THIỆU</div>
          <div
            dangerouslySetInnerHTML={{
              __html: data && data.descriptionHTML,
            }}
          ></div>
        </div>
      </div>
      <FooterHeader />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
