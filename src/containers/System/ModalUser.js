import { connect } from "react-redux";
import React, { useState } from "react";
import Portal from "./Portal";
import "./ModelUser.scss";

function ModalUser({ setModalUser, newUserForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
      gender,
      role,
    };
    newUserForm(data);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setPhone("");
    setGender("");
  };

  return (
    <Portal>
      <div className="wrapper">
        <div className="body">
          <h2 className="label">Create a new user</h2>
          <i
            className="fa-solid fa-xmark icon-close"
            onClick={() => setModalUser(false)}
          />
          <div className="container">
            <form className="form">
              <div className="form-row">
                <div className="form-group ">
                  <label for="inputEmail4">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label for="inputPassword4">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

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

              <div className="form-row">
                <div className="form-group  ">
                  <label for="inputCity">Phone number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="phoneNumber"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="options">
                  <div className="form-group1 w-24 ">
                    <label for="inputState">Gender:</label>
                    <select
                      id="inputState"
                      onChange={(e) => setGender(e.target.value)}
                      className="form-control"
                    >
                      <option selected>--Sex--</option>
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                    </select>
                  </div>
                  <div className="form-group1 w-24 ">
                    <label for="inputZip">Role:</label>
                    <select
                      id="inputState"
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                    >
                      <option value="author">Author</option>
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary btn-submit"
              >
                Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
