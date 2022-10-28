import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, useLocation, withRouter } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { useEffect } from "react";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import Select from "react-select";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

function DetailDoctor({ language, id }) {
  const [infoDoctor, setInfoDoctor] = useState("");
  const [infoDoctorMore, setInfoDoctorMore] = useState("");
  const [isDetail, setIsDetail] = useState(false);
  const [date, setDate] = useState("");

  const match = useLocation();
  const query = new URLSearchParams(match.search);

  useEffect(() => {
    getDetailInfoDoctor(id)
      .then((data) => {
        data && data.errCode === 0 && setInfoDoctor(data.data);

        setInfoDoctorMore(data.data.Doctor_Info);
      })
      .catch((e) => console.log(e));
  }, [id]);

  let nameVi = "",
    nameEn = "";
  if (infoDoctor && infoDoctor.positionData) {
    nameVi = `${infoDoctor.positionData.valueVi}, ${infoDoctor.lastName} ${infoDoctor.firstName}`;
    nameEn = `${infoDoctor.positionData.valueEn}, ${infoDoctor.firstName} ${infoDoctor.lastName}`;
  }

  const [allDays, setAllDays] = useState([]);
  const capitalizeFirstLatter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("dddd - DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = capitalizeFirstLatter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("dddd - DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      arrDate.push(object);
    }
    setAllDays(arrDate);
  }, [language]);

  const [scheduleList, setScheduleList] = useState([]);
  const handleOnchangeSelect = (e) => {
    setDate({
      timeStemp: e.target.value.split(",")[0],
      date: e.target.value.split(",")[1],
    });

    getScheduleDoctorByDate(id, e.target.value.split(",")[0])
      .then((data) => {
        if (data && data.errCode === 0) {
          setScheduleList(data.data);
        }
      })
      .catch((e) => console.log(e));
  };
  // modal booking
  const [isModal, setIsModal] = useState(false);
  const [time, setTime] = useState("");

  return (
    <>
      {isModal && (
        <BookingModal
          setIsModal={setIsModal}
          dataInfo={{ ...infoDoctor, ...infoDoctorMore }}
          time={time}
          date={date}
          doctorId={id}
        />
      )}

      <div className="doctor-detail-container s-doctor">
        <div className="intro-doctor">
          <div className="content-left">
            <img src={infoDoctor && infoDoctor.image} alt="avatar" />
            <Link to={`/detail-doctor?id=${id}`}>
              <p className="see-more">Xem thêm...</p>
            </Link>
          </div>
          <div className="content-right">
            <h2 className="title-doctor">
              {infoDoctor &&
              infoDoctor.positionData &&
              language === LANGUAGES.VI
                ? nameVi
                : nameEn}
            </h2>
            <div className="content-text-right">
              {infoDoctor &&
                infoDoctor.Markdown &&
                infoDoctor.Markdown.description}
            </div>
            <div className="btn-right">
              <button className="btn">
                <i className="fa-solid fa-thumbs-up"></i>Thích
              </button>
              <button className="btn">Chia sẻ</button>
            </div>
          </div>
        </div>
        <div className="schedule-doctor">
          <div className="doctor-date-title">
            <select onChange={handleOnchangeSelect}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((day, index) => {
                  return (
                    <option
                      value={[day.value, day.label]}
                      data-label={day.label}
                      key={index}
                    >
                      {day.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="lunar-doctor">
            <i className="fa-solid fa-calendar-days"></i>
            <FormattedMessage id="manage-schedule.schedule" />
          </div>
          <div className="calender-doctor">
            <DoctorSchedule
              scheduleList={scheduleList}
              setIsModal={setIsModal}
              setTime={setTime}
            />

            <div className="calender-right">
              <h3 className="h3-title">
                <FormattedMessage id="manage-schedule.address" />
              </h3>
              <div className="room">
                {infoDoctorMore && infoDoctorMore.nameClinic}
              </div>
              <div className="address">
                {infoDoctorMore && infoDoctorMore.addressClinic}
              </div>
              <div className="price">
                <h3 className="h3-title">
                  <FormattedMessage id="manage-schedule.price" />
                </h3>
                <span>
                  {language === LANGUAGES.VI &&
                  infoDoctorMore &&
                  infoDoctorMore.priceData
                    ? infoDoctorMore.priceData.valueVi
                    : infoDoctorMore &&
                      infoDoctorMore.priceData &&
                      infoDoctorMore.priceData.valueEn}
                  {language === LANGUAGES.VI ? ` VND` : ` USD`}.
                </span>
                <span className="detail">
                  {/* <FormattedMessage id="manage-schedule.detail" /> */}
                </span>
              </div>
              <div className="price">
                <p className="h3-title baohiem">
                  <FormattedMessage id="manage-schedule.insurance" />
                </p>

                {isDetail && (
                  <div className="note-detail">{infoDoctorMore.note}</div>
                )}
                <span className="detail" onClick={() => setIsDetail(!isDetail)}>
                  {!isDetail ? (
                    <FormattedMessage id="manage-schedule.detail" />
                  ) : (
                    "Thu gọn"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="comment-doctor"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
