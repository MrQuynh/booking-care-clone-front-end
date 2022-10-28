import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Select from "react-select";
import "./ManageSchedule.scss";
import { useEffect } from "react";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";

import { saveBulkScheduleDoctor } from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";

function ManageSchedule({
  fetchAllDoctors,
  language,
  allDoctors,
  fetchAllScheduleTime,
  allScheduleTime,
}) {
  const buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  const hasAllDoctors = allDoctors.length > 0 && allDoctors;
  const [listDoctors, setListDoctors] = useState(hasAllDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeTime, setRangeTime] = useState([]);

  useEffect(() => {
    fetchAllDoctors();
    fetchAllScheduleTime();

    if (allDoctors !== listDoctors) {
      const dataSelect = buildDataInputSelect(allDoctors);
      setListDoctors(dataSelect);
    }
    if (allScheduleTime !== rangeTime) {
      let data = allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }

      setRangeTime(data);
    }
  }, [language]);

  const handleChange = (selectedDoctor) => {
    setSelectedDoctor(() => selectedDoctor);
  };
  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };
  const handleClick = (time) => {
    if (rangeTime && rangeTime.length > 0) {
      const newTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });

      setRangeTime(newTime);
    }
  };
  const handleSaveSchedule = () => {
    if (!currentDate || !selectedDoctor) {
      alert("Please select");
      return;
    }
    let selectedTime;
    // const formatDate = moment(currentDate).format("DD/MM/YYYY");
    const formatDate = new Date(currentDate).getTime();
    let result = [];
    if (rangeTime && rangeTime.length > 0) {
      selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      }
    }
    saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatDate: "" + formatDate,
    }).then((data) => {
      if (data && data.errCode === 0) {
        toast.success("Save schedule succeeded!");
      } else {
        toast.error("Save schedule error!:");
      }
    });
    console.log("check data:", result);
  };
  //
  return (
    <div className="manage-schedule-container">
      <div className="m-s-title">
        <FormattedMessage id="manage-schedule.title" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-schedule.choose-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={handleChange}
              options={listDoctors}
            />
          </div>
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-schedule.choose-date" />
            </label>
            <DatePicker
              onChange={handleOnChangeDatePicker}
              value={currentDate}
              className="form-control"
              minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </div>
          <div className="col-12 pick-hour-container">
            {rangeTime &&
              rangeTime.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(item)}
                  className={
                    item.isSelected === true
                      ? "btn btn-primary btn-time active"
                      : "btn btn-primary btn-time "
                  }
                >
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              ))}
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary btn-save"
              onClick={handleSaveSchedule}
            >
              <FormattedMessage id="manage-schedule.save" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
