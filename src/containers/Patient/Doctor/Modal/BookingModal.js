import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import { LANGUAGES } from "../../../../utils";
import { useEffect, useState } from "react";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { fetchGenderStart } from "../../../../store/actions";
import DatePicker from "react-flatpickr";
import { postPatientBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const gendersList = [
  { id: 87, keyMap: "M", type: "GENDER", valueEn: "Male", valueVi: "Nam" },
  { id: 88, keyMap: "F", type: "GENDER", valueEn: "Female", valueVi: "Nữ" },
  { id: 89, keyMap: "O", type: "GENDER", valueEn: "Male", valueVi: "Khác" },
];
function BookingModal({
  language,
  setIsModal,
  dataInfo,
  time,
  date,
  doctorId,
}) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const handleOnChangeDatePicker = (date1) => {
    setBirthday(date1[0]);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleSubmit = () => {
    const data = {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      gender,
      doctorId,
      date: date.timeStemp,
      timeSchedule: `${time.time}, ${date.date}`,
      timeType: time.dataTime.timeType,
      doctorName: dataInfo.lastName + dataInfo.firstName,
    };

    postPatientBooking(data).then((res) => {
      if (res.errCode === 0) {
        toast.success("Booking appointment was successfully!");
        setIsModal(false);
      } else {
        toast.error("Booking appointment was error!");
      }
    });
  };
  return (
    <Modal isOpen={true} className={"booking-container"} size="lg" centered>
      <div className="booking-content">
        <div className="booking-header">
          <label>
            <FormattedMessage id="patient-booking.info" />
          </label>
          <div onClick={() => setIsModal(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="info-doctor">
          <div className="info">
            <img src={dataInfo && dataInfo.image} alt="avatar" />
            <div>
              <p>{`${dataInfo.positionData.valueVi}, ${dataInfo.lastName} ${dataInfo.firstName}`}</p>
              <span>{`${time.time}, ${date.date}`}</span>
            </div>
          </div>
          <div className="mt-4 d-flex">
            <FormattedMessage id="patient-booking.price" />:
            <p>
              {language === LANGUAGES.VI
                ? `${dataInfo.priceData.valueVi} VND`
                : `${dataInfo.priceData.valueEn} USD`}
            </p>
          </div>
        </div>
        <div className="booking-body">
          <form className="mx-4 mb-4">
            <div className="form-row mt-2">
              <div className="form-group col-md-6">
                <label for="inputEmail4">
                  <FormattedMessage id="patient-booking.name" />:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ tên..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  <FormattedMessage id="patient-booking.phone" />:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Số điện thoại..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row mt-2">
              <div className="form-group col-md-6">
                <label for="inputEmail4">
                  <FormattedMessage id="patient-booking.email" />:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  <FormattedMessage id="patient-booking.address" />:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row mt-2">
              <div className="col-12">
                <label for="inputAddress">
                  <FormattedMessage id="patient-booking.reason" />:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lí do khám..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row mt-2">
              <div className="form-group col-md-6">
                <label for="inputEmail4">
                  <FormattedMessage id="patient-booking.birthday" />:
                </label>

                <DatePicker
                  onChange={handleOnChangeDatePicker}
                  value={birthday}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  <FormattedMessage id="patient-booking.gender" />:
                </label>

                <select className="form-control" onClick={handleGender}>
                  {gendersList.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="booking-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FormattedMessage id="patient-booking.confirm" />
          </button>
          <button className="btn btn-primary" onClick={() => setIsModal(false)}>
            <FormattedMessage id="patient-booking.cancel" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
