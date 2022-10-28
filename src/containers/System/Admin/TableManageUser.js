import React from "react";

import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import { useEffect } from "react";

import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

function TableManageUser({
  fetchUserRedux,
  users,
  deleteUserRedux,
  handleEditUser,
}) {
  const usersRedux = users;
  useEffect(() => {
    fetchUserRedux();
  }, []);

  const handleDelete = (id) => {
    deleteUserRedux(id);
  };

  const handleEdit = (user) => {
    handleEditUser(user);
  };
  return (
    <React.Fragment>
      <div className="users-container">
        <div className="title text-center">Manager users with Mr.Bin</div>
        <div className="m-4">
          <div className="my-2">
            <button className="btn btn-primary btn-add-user">
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
              users.length > 0 &&
              usersRedux.map((user, index) => (
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
      {/* <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      /> */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteuser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
