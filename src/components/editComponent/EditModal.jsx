import React, { useState } from "react";
import "./editModal.scss";
const EditModal = ({ email, roleId, closeModal }) => {
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedRoleId, setUpdatedRoleId] = useState(roleId);

  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value);
  };

  const handleRoleIdChange = (e) => {
    setUpdatedRoleId(e.target.value);
  };

  const handleSave = () => {
    // Perform save/update logic here
    console.log("Updated Email:", updatedEmail);
    console.log("Updated Role ID:", updatedRoleId);

    // Close the modal
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
          <label>Role ID:</label>
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
