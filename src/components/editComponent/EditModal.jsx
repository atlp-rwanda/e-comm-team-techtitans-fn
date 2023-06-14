import { useState } from "react";
import "./editModal.scss";
import { useDispatch } from "react-redux";
import { addRoles } from "../../Redux/Features/User/viewUser/setRole.slice";
import { getAllUsers } from "../../Redux/Features/User/viewUser/view.slice";
import { message } from "antd";
import PropTypes from "prop-types";

const EditModal = ({ email, roleId, id, closeModal }) => {
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
      let roleIdToSend;
      if (updatedRoleId === "Admin") {
        roleIdToSend = 1;
      } else if (updatedRoleId === "Seller") {
        roleIdToSend = 2;
      } else if (updatedRoleId === "Buyer") {
        roleIdToSend = 3;
      } else {
        throw new Error("Invalid role selected");
      }

      await dispatch(
        addRoles({ email: updatedEmail, roleId: roleIdToSend, id: id })
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
          <select value={updatedRoleId} onChange={handleRoleIdChange}>
            <option value="Admin">Admin</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
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

EditModal.propTypes = {
  email: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default EditModal;
