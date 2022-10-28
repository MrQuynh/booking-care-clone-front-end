import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import About from "./Section/About";
import "./HomePage.scss";
import FooterHeader from "./FooterHeader";
import * as actions from "../../store/actions";
import { useEffect } from "react";
import TopDoctors from "./Section/TopDoctors";
import Specialty1 from "./Section/Specialty1";

function HomePage({ loadTopDoctors, topDoctors }) {
  useEffect(() => {
    loadTopDoctors();
  }, []);

  return (
    <div className="home-wrapper">
      <HomeHeader isShowBanner={true} />
      <Specialty1 gray={true} title="Chuyên khoa phổ biến" btnType="XEM THÊM" />
      <Specialty title="Cơ sở y tế nổi bật" btnType="TÌM KIẾM" />
      <TopDoctors
        gray={true}
        title="Bác sĩ nổi bật tuần qua"
        btnType="TÌM KIẾM"
        hasDoctor={true}
        data={topDoctors}
      />

      <Specialty title="Cẩm nang" btnType="TẤT CẢ BÀI VIẾT" />
      <About title="Truyền thông nói về BookingCare" />
      <FooterHeader />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
