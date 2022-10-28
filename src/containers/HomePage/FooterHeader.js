import { connect } from "react-redux";
import "./FooterHeader.scss";
function FooterHeader() {
  return (
    <>
      <div className="footer-header">
        <div className="footer-container">
          <div className="info-booking">
            <div className="left-booking">
              <div className="title-booking">Công ty Bin BookingCare</div>
              <div>
                <i className="fa-solid fa-location-dot"></i>28 Thành Thái, Dịch
                Vọng, Cầu Giấy, HCM
              </div>
              <div>
                <i className="fa-solid fa-check"></i> ĐKKD số: 0123456678. Sở
                KHĐT Hà Nam cấp ngày 16/03/2050
              </div>
              <div className="check-booking">
                <img
                  src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                  alt="check"
                />
                <img
                  src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                  alt="ima"
                />
              </div>
            </div>
            <div className="center-booking">
              <ul>
                <li>Liên hệ hợp tác</li>
                <li>Gói chuyển đổi số doanh nghiệp</li>
                <li>Tuyển dụng</li>
                <li>Câu hỏi thường gặp</li>
                <li>Điều khoản sử dụng</li>
                <li>Chính sách Bảo mật</li>
              </ul>
            </div>
            <div className="right-booking">
              <div className="location-booking">
                <p className="l-title">Trụ sở tại Hà Nội</p>
                <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
              </div>
              <div className="location-booking">
                <p className="l-title">Văn phòng tại TP Hồ Chí Minh</p>
                <span>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</span>
              </div>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-mobile"></i>
            Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
            <p>AndroidiPhone/iPadKhác</p>
          </div>
        </div>
      </div>
      <div className="home-footer">
        <p>
          &copy; 2022 by Mr.Bin. <a href="#/">More information</a>
        </p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterHeader);
