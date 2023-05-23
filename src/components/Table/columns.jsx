import { useState } from "react";
import { Link } from "react-router-dom";
import EditModal from "../editComponent/EditModal"; // Import your modal component

export const COLUMNS = [
  {
    Header: "No.",
    accessor: "id",
    Cell: ({ row }) => row.index + 1, // Custom accessor to display count from 1
  },
  {
    Header: "Full Name",
    accessor: "fullname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "roleId",
  },
  {
    Header: "Status",
    accessor: "accountStatus",
    Cell: ({ value }) =>
      value === "active" ? (
        <div className="active-status">{value}</div>
      ) : (
        <div>{value}</div>
      ),
  },
  {
    Header: "Action",
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const { email, roleId } = row.original;

      const openModal = () => {
        setShowModal(true);
      };

      const closeModal = () => {
        setShowModal(false);
      };

      return (
        <div className="action">
          <button onClick={openModal}>
            <i className="bx bxs-edit"></i>
          </button>
          <Link to={`/edit/`}>
            <i className="bx bxs-cog"></i>
          </Link>
          {showModal && (
            <EditModal email={email} roleId={roleId} closeModal={closeModal} />
          )}
        </div>
      );
    },
  },
];
