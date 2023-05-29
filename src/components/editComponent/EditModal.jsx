import { useState } from "react";
import "./editModal.scss";
import { useDispatch } from "react-redux";
import { addRoles } from "../../Redux/Features/User/viewUser/setRole.slice";
import { getAllUsers } from "../../Redux/Features/User/viewUser/view.slice";
import { message } from "antd";

import { useParams } from "react-router-dom";

const EditModal = ({ email, roleId, id, closeModal }) => {
  // const { id } = useParams(); // Retrieve the ID from params
  console.log("ID:", id);

  const dispatch = useDispatch();

  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedRoleId, setUpdatedRoleId] = useState(roleId);

  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value);
  };

  const handleRoleIdChange = (e) => {
    setUpdatedRoleId(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addRoles({ email: updatedEmail, roleId: updatedRoleId, id: id })
      );
      await dispatch(getAllUsers()); // Fetch all users again

      message.success("User updated successfully");
    } catch (error) {
      // Handle error
      message.error("Failed to update user");
    }

    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User Role</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={updatedEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            value={updatedRoleId}
            onChange={handleRoleIdChange}
          />
        </div>
        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
