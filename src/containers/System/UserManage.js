import React from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { userService } from "../../services";
import { useEffect } from "react";
import { useState } from "react";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

function UserManage() {
  const [users, setUsers] = useState([]);
  const [modalUser, setModalUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [userEditInfo, setUserEditInfo] = useState({});

  useEffect(() => {
    userService
      .getAllUsers("ALL")
      .then((data) => {
        setUsers(data.users);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleAddUser = () => {
    setModalUser(!modalUser);
  };
  const newUserForm = async (data) => {
    try {
      const response = await userService.createNewUser(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        userService
          .getAllUsers("ALL")
          .then((data) => {
            setUsers(data.users);
          })
          .catch((e) => console.log(e));
        setModalUser(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    console.log(id);
    const response = await userService.deleteUser(id);
    try {
      if (response && response.errCode === 0) {
        userService
          .getAllUsers("ALL")
          .then((data) => {
            setUsers(data.users);
          })
          .catch((e) => console.log(e));
        setModalUser(false);
      } else {
        alert(response.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleEdit = (user) => {
    setUserEditInfo(user);
    setModalEditUser(true);
  };
  const editUser = async (userEdit) => {
    const res = await userService.editUser(userEdit);
    try {
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        userService
          .getAllUsers("ALL")
          .then((data) => {
            setUsers(data.users);
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="users-container">
      {modalUser && (
        <ModalUser setModalUser={setModalUser} newUserForm={newUserForm} />
      )}
      {modalEditUser && (
        <ModalEditUser
          setModalEditUser={setModalEditUser}
          editUser={editUser}
          data={userEditInfo}
        />
      )}

      <div className="title text-center">Manager users with Mr.Bin</div>
      <div className="m-4">
        <div className="my-2">
          <button
            className="btn btn-primary btn-add-user"
            onClick={handleAddUser}
          >
            <i className="fa-solid fa-plus" />
            Add new user
          </button>
        </div>
        <table id="customers">
          <tr className="text-center">
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.address}</td>
                <td className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(user)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fa-solid fa-trash"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
