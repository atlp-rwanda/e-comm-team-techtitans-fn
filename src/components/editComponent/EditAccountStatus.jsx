import { useState } from 'react';
import './editModal.scss';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../Redux/Features/User/viewUser/view.slice';
import { setAccountStatus } from '../../Redux/Features/User/accountStatusSlice';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

const EditAccountStatus = ({ id, closeModal }) => {
  const { register, handleSubmit, resetField } = useForm();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const dispatch = useDispatch();

  const statuses = ['Activate', 'Deactivate'];

  const handleSubmission = async (data) => {
    try {
      if (data.status === '') {
        message.warning('Please pick a new account status');
      } else if (data.reason === '') {
        message.warning('Please enter a reason for account status change');
      } else {
        setIsSaveLoading(true);
        const response = await dispatch(
          setAccountStatus({
            id,
            accountStatus: data.status,
            reason: data.reason,
          }),
        );
        await dispatch(getAllUsers()); // Fetch all users again
        message.success('Account status updated successfully');
        setIsSaveLoading(true);
        closeModal();
      }
    } catch (error) {
      // Handle error
      message.error(`Failed to edit the account status: ${error}`);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Disable or Enable an account</h2>
        <div className="form-group">
          <label>New Account Status</label>
          <select
            className="account-status-options"
            onChange={(e) => {
              setAccountStatus(e.target.value);
            }}
            {...register('status')}
          >
            <option value="">Select an action</option>
            <option value="active">{statuses[0]}</option>
            <option value="inactive">{statuses[1]}</option>
          </select>
        </div>
        <div className="form-group">
          <label>Reason</label>
          <input type="text" {...register('reason')} />
        </div>
        <div className="buttons">
          <button className="save-btn" onClick={handleSubmit(handleSubmission)}>
            {isSaveLoading ? 'Updating...' : 'Save'}
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountStatus;
