// import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import HomeHeader from "../../HomePage/HomeHeader";

import { useEffect } from "react";
import { useState } from "react";
import "./DetailSpecialty.scss";
import { getDetailSpecialty } from "../../../services/userService";
import DetailDoctorSpecialty from "../Doctor/DetailDoctorSpecialty";
import _ from "lodash";
import FooterHeader from "../../HomePage/FooterHeader";
function DetailSpecialty() {
  const match = useLocation();
  const query = new URLSearchParams(match.search);
  const id = query.get("id");
  const [listDoctors, setListDoctors] = useState([]);
  const [specialtyInfo, setSpecialtyInfo] = useState("");

  useEffect(() => {
    getDetailSpecialty(id).then((data) => {
      if (data.errCode === 0) {
        setListDoctors(data.data.listDoctors);
        setSpecialtyInfo(data.data.specialtyInfo);
      }
    });
  }, [id]);

  return (
    <div>
      <HomeHeader />
      <div className="s-container">
        <div className="info-specialty">
          <div className="s-title">{specialtyInfo.name}</div>
          <div className="info-content">
            <div
              dangerouslySetInnerHTML={{
                __html: specialtyInfo.descriptionHTML,
              }}
            ></div>
          </div>
        </div>

        <div className="list-doctor-container">
          <div className="list-doctors">
            <p className="location">Toàn quốc</p>
            {listDoctors &&
              listDoctors.length > 0 &&
              listDoctors.map((item, index) => {
                if (!_.isEmpty(item)) {
                  return (
                    <div className="doctor-item" key={index}>
                      <DetailDoctorSpecialty id={item.doctorId} />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="more-question">
        <div>
          Cần tìm hiểu thêm? <p> Xem câu hỏi thường gặp.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
