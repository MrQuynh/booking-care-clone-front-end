import "./ManagePatient.scss";
import React from "react";
import { connect } from "react-redux";

function ManagePatient({ language }) {
  return (
    <div className="manage-patient-container">
      <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
      <div className="m-p-body row">
        <div>
            <label>Chọn ngày khám:</label>
            <input className="form-control"/>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
