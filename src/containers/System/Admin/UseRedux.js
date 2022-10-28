import React, { useState } from "react";

import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";

import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

function UseRedux({
  language,
  getGenderStart,
  genderRedux,
  roleRedux,
  positionRedux,
  isLoadingGenders,
  getRoleStart,
  getPositionStart,
  createNewuser,
  edituser,
}) {
  const [preview, setPreview] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState(
    genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : ""
  );
  const [position, setPosition] = useState(
    positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : ""
  );
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(
    roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : ""
  );
  const [avatar, setAvatar] = useState("");

  const [action, setAction] = useState(CRUD_ACTIONS.CREATE);

  useEffect(() => {
    getGenderStart();
    getRoleStart();
    getPositionStart();
  }, []);
  const handleOnchangeImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const objectUrl = URL.createObjectURL(file);
    const base64 = await CommonUtils.getBase64(file);
    setAvatar(base64);
    setPreview(objectUrl);
  };
  const data = {
    email,
    password,
    firstName,
    lastName,
    gender,
    phoneNumber: phone,
    address,
    positionId: position,
    roleId: role,
    avatar,
    id,
  };

  const handleSaveUser = () => {
    if (action === CRUD_ACTIONS.CREATE) {
      createNewuser(data);
      setEmail("");
      setPassword("hardcode");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setGender(genderRedux[0].keyMap);
      setPosition(positionRedux[0].keyMap);
      setRole(roleRedux[0].keyMap);
      setPreview("");
    }
    if (action === CRUD_ACTIONS.EDIT) {
      edituser(data);
      setAction(CRUD_ACTIONS.CREATE);
      setEmail("");
      setPassword("hardcode");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setGender(genderRedux && genderRedux[0].keyMap);
      setPosition(positionRedux && positionRedux[0].keyMap);
      setRole(roleRedux && roleRedux[0].keyMap);
      setPreview("");
    }
  };
  const handleEditUser = (data) => {
    let imageBase64 = "";
    if (data.image) {
      imageBase64 = new Buffer(data.image, "base64").toString("binary");
    }
    setPreview(data.image);

    setEmail(data.email);

    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phoneNumber);
    setAddress(data.address);
    setGender(data.gender);
    setPosition(data.positionId);
    setRole(data.roleId);
    setId(data.id);
    // setPreview(data.preview);

    edituser(data);
    setAction(CRUD_ACTIONS.EDIT);
  };

  return (
    <div className="user-redux-container">
      <div className="title ">USER REDUX Mr.Bin</div>;
      <div>{isLoadingGenders ? "Loading gender" : ""}</div>
      <div className="user-redux-body">
        <div className="container">
          <div className="row">
            <div className="col-12 my-3">
              <FormattedMessage id="manage-user.add" />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={action === CRUD_ACTIONS.EDIT ? true : false}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={action === CRUD_ACTIONS.EDIT ? true : false}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.first-name" />
              </label>
              <input
                className="form-control"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.last-name" />
              </label>
              <input
                className="form-control"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.phone" />
              </label>
              <input
                className="form-control"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-9">
              <label>
                <FormattedMessage id="manage-user.address" />
              </label>
              <input
                className="form-control"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {/* <option selected>Choose...</option> */}
                {genderRedux &&
                  genderRedux.length > 0 &&
                  genderRedux.map((gender, index) => {
                    return (
                      <option value={index} key={gender.keyMap}>
                        {language === LANGUAGES.VI
                          ? gender.valueVi
                          : gender.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-control"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                {/* <option selected>Choose...</option> */}
                {positionRedux &&
                  positionRedux.length > 0 &&
                  positionRedux.map((position, index) => {
                    return (
                      <option value={position.keyMap} key={index}>
                        {language === LANGUAGES.VI
                          ? position.valueVi
                          : position.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.role" />
              </label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {/* <option selected>Choose...</option> */}
                {roleRedux &&
                  roleRedux.length > 0 &&
                  roleRedux.map((role, index) => {
                    return (
                      <option value={role.keyMap} key={index}>
                        {language === LANGUAGES.VI
                          ? role.valueVi
                          : role.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="preview-img-container">
                <input
                  id="previewImg"
                  type="file"
                  hidden
                  onChange={handleOnchangeImage}
                />
                <label htmlFor="previewImg" className="label-upload">
                  Tải ảnh<i className="fa-solid fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{ backgroundImage: `url(${preview}) ` }}
                ></div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <button
                className={
                  action === CRUD_ACTIONS.EDIT
                    ? "btn btn-warning"
                    : "btn btn-primary"
                }
                onClick={handleSaveUser}
              >
                {action === CRUD_ACTIONS.EDIT ? (
                  <FormattedMessage id="manage-user.edit" />
                ) : (
                  <FormattedMessage id="manage-user.save" />
                )}
              </button>
            </div>

            <div className="col-12">
              <TableManageUser
                setAction={setAction}
                handleEditUser={handleEditUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGenders: state.admin.isLoadingGenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createNewuser: (data) => dispatch(actions.createNewuser(data)),
    edituser: (data) => dispatch(actions.edituser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UseRedux);
