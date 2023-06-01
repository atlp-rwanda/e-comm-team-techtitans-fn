import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditModal from '../editComponent/EditModal'; // Import your modal component
import EditAccountStatus from '../editComponent/EditAccountStatus';

export const COLUMNS = [
  {
    Header: 'No.',
    accessor: 'id',
    Cell: ({ row }) => row.index + 1, // Custom accessor to display count from 1
  },
  {
    Header: 'Full Name',
    accessor: 'fullname',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'roleId',
  },
  {
    Header: 'Status',
    accessor: 'accountStatus',
    Cell: ({ value }) =>
      value === 'active' ? (
        <div className="active-status">{value}</div>
      ) : (
        <div className="inactive-status">{value}</div>
      ),
  },
  {
    Header: 'Action',
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const [showAccountModal, setShowAccountModal] = useState(false);
      const navigate = useNavigate();
      const { email, roleId, id } = row.original;

      const openModal = (id) => {
        setShowModal(true);
      };
      const openAccountStatusModal = (id) => {
        navigate(`/listusers/${id}`);
        setShowAccountModal(true);
      };

      const closeModal = () => {
        setShowModal(false);
        setShowAccountModal(false);
        navigate(`/listusers`);
      };

      return (
        <div className="action">
          <i className="bx bxs-edit" onClick={() => openModal(id)}></i>
          <i
            className="bx bxs-cog"
            onClick={() => openAccountStatusModal(id)}
          ></i>
          {showModal && (
            <EditModal
              email={email}
              roleId={roleId}
              id={id}
              closeModal={closeModal}
            />
          )}
          {showAccountModal && (
            <EditAccountStatus id={id} closeModal={closeModal} />
          )}
        </div>
      );
    },
  },
];
