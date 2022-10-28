import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopDoctorHomeService } from "../../../services/userService";
import FooterHeader from "../../HomePage/FooterHeader";
import HomeHeader from "../../HomePage/HomeHeader";

import "./ListDoctors.scss";

function ListDoctors() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getTopDoctorHomeService(10)
      .then((data) => {
        if (data && data.errCode === 0) {
          setDoctors(data.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <HomeHeader />
      <div className="list-container">
        <div className="list-title">Danh sách bác sĩ</div>
        <div className="list-doctors">
          {doctors &&
            doctors.length > 0 &&
            doctors.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <Link to={`detail-doctor?id=${item.id}`}>
                  <div className="item" key={index}>
                    <img className="item-image" alt="anh" src={imageBase64} />
                    <div className="item-info">
                      <div className="item-name">
                        {`${item.firstName} ${item.lastName}`}
                      </div>
                      <div className="item-more-info">
                        {item.positionData && item.positionData.valueVi}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <FooterHeader />
    </>
  );
}

export default ListDoctors;
