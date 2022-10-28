import React, { useState } from "react";

import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { useEffect } from "react";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

function ManageDoctor({
  fetchAllDoctors,
  allDoctors,
  language,
  saveDetailDoctor,
  getRequiredDoctorInfoRedux,
  allRequiredDoctorInfo,
}) {
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDoctor, setSelectedOption] = useState("");
  const mdParser = new MarkdownIt();
  const [listDoctors, setListDoctors] = useState(allDoctors);
  const [hasData, setHasData] = useState(false);
  const [listPrice, setListPrice] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listClinic, setListClinic] = useState([]);
  const [listSpecialty, setListSpecialty] = useState([]);

  // save to doctor info
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [nameClinic, setNameClinic] = useState("");
  const [addressClinic, setAddressClinic] = useState("");
  const [note, setNote] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");

  const handleEditorChange = ({ html, text }) => {
    setContentMarkdown(text);
    setContentHTML(html);
  };

  if (allDoctors.length !== listDoctors.length) {
    setListDoctors(allDoctors);
  }

  useEffect(() => {
    fetchAllDoctors();
    if (allDoctors !== listDoctors) {
      const dataSelect = buildDataInputSelect(allDoctors, "USERS");

      setListDoctors(dataSelect);
    }
    getRequiredDoctorInfoRedux();
    if (allRequiredDoctorInfo) {
      const dataSelectPrice = buildDataInputSelect(
        allRequiredDoctorInfo.resPrice,
        "PRICE"
      );
      const dataSelectPayment = buildDataInputSelect(
        allRequiredDoctorInfo.resPayment
      );
      const dataSelectProvince = buildDataInputSelect(
        allRequiredDoctorInfo.resProvince
      );
      const dataSelectSpecialty = buildDataInputSelect(
        allRequiredDoctorInfo.resSpecialty,
        "SPECIALTY"
      );

      setListPayment(dataSelectPayment);
      setListPrice(dataSelectPrice);
      setListProvince(dataSelectProvince);
      setListSpecialty(dataSelectSpecialty);
    }
  }, [language]);

  const handleSaveContentMarkdown = () => {
    const data = {
      contentMarkdown,
      contentHTML,
      description,
      doctorId: +selectedDoctor.value,
      action: hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: selectedPrice.value,
      selectedPayment: selectedPayment.value,
      selectedProvince: selectedProvince.value,
      nameClinic,
      addressClinic,
      note,
      clinicId:
        selectedClinic && selectedClinic.value ? selectedClinic.value : "",
      specialtyId: selectedSpecialty.value,
    };
    console.log(data);
    saveDetailDoctor(data);
  };
  const handleChange = (selectedDoctor) => {
    setSelectedOption(() => selectedDoctor);
    getDetailInfoDoctor(selectedDoctor.value)
      .then((data) => {
        if (data && data.errCode === 0 && data.data.Markdown) {
          setDescription(data.data.Markdown.description);
          setContentHTML(data.data.Markdown.contentHTML);
          setContentMarkdown(data.data.Markdown.contentMarkdown);
          setHasData(true);
        } else {
          setDescription("");
          setContentHTML("");
          setContentMarkdown("");
          setHasData(false);
        }
        if (data && data.errCode === 0 && data.data.Doctor_Info) {
          setSelectedPrice({
            label:
              language === LANGUAGES.VI
                ? data.data.Doctor_Info.priceData.valueVi
                : data.data.Doctor_Info.priceData.valueEn,
            value: data.data.Doctor_Info.priceId,
          });
          setSelectedPayment({
            label:
              language === LANGUAGES.VI
                ? data.data.Doctor_Info.paymentData.valueVi
                : data.data.Doctor_Info.paymentData.valueEn,
            value: data.data.Doctor_Info.paymentId,
          });
          setSelectedProvince({
            label:
              language === LANGUAGES.VI
                ? data.data.Doctor_Info.provinceData.valueVi
                : data.data.Doctor_Info.provinceData.valueEn,
            value: data.data.Doctor_Info.provinceId,
          });
          setNameClinic(data.data.Doctor_Info.nameClinic);
          setAddressClinic(data.data.Doctor_Info.addressClinic);
          setNote(data.data.Doctor_Info.note);
        }
      })
      .catch((e) => console.log(e));
  };

  const buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      } else if (type === "PRICE") {
        inputData.map((item) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;

          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      } else if (type === "SPECIALTY") {
        inputData.map((item) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      } else {
        inputData.map((item) => {
          let object = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };
  // doctor info
  const handleChangeDoctorInfo = (selectedOptions, name) => {
    if (name.name === "selectedPrice") {
      setSelectedPrice(selectedOptions);
    } else if (name.name === "selectedPayment") {
      setSelectedPayment(selectedOptions);
    } else if (name.name === "selectedProvince") {
      setSelectedProvince(selectedOptions);
    } else if (name.name === "selectedSpecialty") {
      setSelectedSpecialty(selectedOptions);
    }
  };

  return (
    <div className="manage-doctor-container">
      <div className="manage-doctor-title">
        <FormattedMessage id="manage-schedule.createNewDoctor" />
      </div>
      <div className="more-info">
        <div className="content-left">
          <label>
            <FormattedMessage id="manage-schedule.chooseDoctor" />
          </label>
          <Select
            value={selectedDoctor && selectedDoctor}
            onChange={handleChange}
            options={listDoctors && listDoctors.length > 0 && listDoctors}
            placeholder={<FormattedMessage id="manage-schedule.chooseDoctor" />}
          />
        </div>
        <div className="content-right">
          <label>
            <FormattedMessage id="manage-schedule.info" />
          </label>
          <textarea
            className="form-control"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
      </div>
      <div className="more-infor-extra row my-4 ">
        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.choosePrice" />:
          </label>
          <Select
            value={selectedPrice}
            onChange={handleChangeDoctorInfo}
            options={listPrice && listPrice.length > 0 && listPrice}
            name="selectedPrice"
            placeholder={<FormattedMessage id="manage-schedule.choosePrice" />}
          />
        </div>
        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.payment" />:
          </label>
          <Select
            value={selectedPayment}
            onChange={handleChangeDoctorInfo}
            name={"selectedPayment"}
            options={listPayment && listPayment.length > 0 && listPayment}
            placeholder={<FormattedMessage id="manage-schedule.payment" />}
          />
        </div>
        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.province" />:
          </label>
          <Select
            value={selectedProvince}
            onChange={handleChangeDoctorInfo}
            name={"selectedProvince"}
            options={listProvince && listProvince.length > 0 && listProvince}
            placeholder={<FormattedMessage id="manage-schedule.province" />}
          />
          ;
        </div>

        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.nameClinic" />:
          </label>
          <input
            className="form-control"
            value={nameClinic}
            onChange={(e) => setNameClinic(e.target.value)}
          />
        </div>
        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.addressClinic" />:
          </label>
          <input
            className="form-control"
            value={addressClinic}
            onChange={(e) => setAddressClinic(e.target.value)}
          />
        </div>
        <div className="col-4 my-2 ">
          <label>
            <FormattedMessage id="manage-schedule.note" />:
          </label>
          <input
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-schedule.specialty" />:
          </label>
          <Select
            value={selectedSpecialty}
            onChange={handleChangeDoctorInfo}
            options={listSpecialty && listSpecialty.length > 0 && listSpecialty}
            name="selectedSpecialty"
            placeholder={<FormattedMessage id="manage-schedule.specialty" />}
          />
        </div>
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-schedule.clinic" />:
          </label>
          <input className="form-control" />
        </div>
      </div>
      <div className="manage-doctor-editor">
        <MdEditor
          style={{ height: "300px" }}
          value={contentMarkdown}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>

      <button
        className="save-content-doctor"
        onClick={handleSaveContentMarkdown}
      >
        {hasData ? "Lưu thông tin" : "Tạo thông tin"}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
