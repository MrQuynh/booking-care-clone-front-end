import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

function DoctorSchedule({ scheduleList, language, setIsModal, setTime }) {
  return (
    <div className="calender-left">
      {scheduleList && scheduleList.length > 0 ? (
        scheduleList.map((item, index) => (
          <span
            key={index}
            onClick={(e) => {
              setTime({ time: e.target.outerText, dataTime: item });
              setIsModal(true);
              // console.log(item);
            }}
          >
            {language === LANGUAGES.VI
              ? item.timeTypeData.valueVi
              : item.timeTypeData.valueEn}
          </span>
        ))
      ) : (
        <div>
          <FormattedMessage id="manage-schedule.no-schedule" />
        </div>
      )}

      {scheduleList.length > 0 ? (
        <p className="book-bottom">
          {" "}
          <FormattedMessage id="manage-schedule.free" />
        </p>
      ) : (
        ""
      )}
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
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
