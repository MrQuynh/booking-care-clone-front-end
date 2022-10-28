// import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import HomeHeader from "../HomePage/HomeHeader";
import "./Doctor/DoctorSchedule.scss";
import { postVerifyBooking } from "../../services/userService";
import { useEffect } from "react";
import { useState } from "react";
function VerifyEmail() {
  const match = useLocation();
  const query = new URLSearchParams(match.search);
  const token = query.get("token");
  const doctorId = query.get("doctorId");
  const [verify, setVerify] = useState("");

  useEffect(() => {
    postVerifyBooking({ doctorId, token }).then((res) => {
      if (res && res.errCode === 0) {
        setVerify(true);
      } else {
        setVerify(false);
      }
    });
  }, [doctorId, token]);
  return (
    <div>
      <HomeHeader isShowBanner={false} />
      <div className="text-confirm">
        {verify
          ? "Xác nhận lịch hẹn khám bệnh thành công!"
          : "Lịch hẹn của bạn đã được xác nhận rồi hoặc không còn tồn tại!"}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
