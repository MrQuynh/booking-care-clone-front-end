import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllClinic } from "../../../services/userService";
import FooterHeader from "../../HomePage/FooterHeader";
import HomeHeader from "../../HomePage/HomeHeader";

import "./ListDoctors.scss";

function ListClinic() {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    getAllClinic().then((data) => {
      if (data && data.errCode === 0) {
        setListData(data.data);
      }
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="list-container">
        <div className="list-title">Danh bệnh viện, phòng khám</div>
        <div className="list-doctors">
          {listData &&
            listData.length > 0 &&
            listData.map((item, index) => {
              return (
                <Link to={`detail-clinic?id=${item.id}`}>
                  <div className="item" key={index}>
                    <img
                      className="item-image-specialty"
                      alt="anh"
                      src={item.image}
                    />
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
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

export default ListClinic;
