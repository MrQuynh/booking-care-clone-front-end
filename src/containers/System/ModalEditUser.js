import { connect } from "react-redux";
import React, { useState } from "react";
import Portal from "./Portal";
import "./ModelUser.scss";

function ModalEditUser({ setModalEditUser, editUser, data }) {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [address, setAddress] = useState(data.address);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEdit = {
      firstName,
      lastName,
      address,
    };
    editUser({ ...data, ...dataEdit });

    setFirstName("");
    setLastName("");
    setAddress("");
    setModalEditUser(false);
  };

  return (
    <Portal>
      <div className="wrapper">
        <div className="body">
          <h2 className="label">Edit user</h2>
          <i
            className="fa-solid fa-xmark icon-close"
            onClick={() => setModalEditUser(false)}
          />
          <div className="container">
            <form className="form">
              <div className="form-row">
                <div className="form-group ">
                  <label for="inputEmail4">First name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label for="inputPassword4">Last name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group full ">
                <label for="inputAddress">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
