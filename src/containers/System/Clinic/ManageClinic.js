import { connect } from "react-redux";
import React, { useState } from "react";
import "./Clinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
function ManageSpecialty() {
  const mdParser = new MarkdownIt();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");

  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  };
  const handleOnchangeImage = async (e) => {
    const file = e.target.files[0];

    const base64 = await CommonUtils.getBase64(file);
    setImage(base64);
  };
  const handleSave = () => {
    const data = {
      descriptionHTML,
      descriptionMarkdown,
      name,
      imageBase64: image,
      address,
    };
    createNewClinic(data).then((res) => {
      if (res && res.errCode === 0) {
        toast.success("Add new clinic successfully!");
      } else {
        toast.error("Something wrong,,,try again!!");
      }
    });
  };
  return (
    <div className=" manage-specialty-container m-4">
      <div className="ms-title">Quản lý cơ sở y tế nổi bật</div>

      <div className="add-new-specialty row ">
        <div className="col-4">
          <label>Tên phòng khám:</label>
          <input
            type="text"
            className="form-control mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-5">
          <label>Địa chỉ phòng khám:</label>
          <input
            type="text"
            className="form-control mt-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-2 form-image">
          <label>Ảnh chuyên khoa:</label>

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
              style={{ backgroundImage: `url(${image}) ` }}
            ></div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <MdEditor
            style={{ height: "300px" }}
            value={descriptionMarkdown}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary btn-save" onClick={handleSave}>
            Lưu
          </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
