import { connect } from "react-redux";

import "./Specialty.scss";

function About({ gray, title }) {
  return (
    <div className={gray ? "specialty gray" : "specialty video-about"}>
      <div className="content">
        <div className="title-spec">{title}</div>
        <div className="body-spec">
          <div className="body-video">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/UCXao7aTDQM?list=RDUCXao7aTDQM"
              title="Hà Anh Tuấn - Tháng Tư Là Lời Nói Dối Của Em (Official MV)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-about">
            <p>
              <strong>
                Giúp bệnh nhân chọn đúng bác sĩ giỏi và đặt lịch nhanh chóng.
              </strong>{" "}
            </p>
            Hệ thống bác sĩ chuyên khoa giỏi, uy tín Thông tin về bác sĩ đã được
            xác thực rõ ràng, chính xác Sắp xếp khám đúng bác sĩ mà bệnh nhân đã
            chọn đặt lịch. Bảo vệ quyền lợi của bệnh nhân khi đi khám Miễn phí
            đặt lịch.
          </div>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
