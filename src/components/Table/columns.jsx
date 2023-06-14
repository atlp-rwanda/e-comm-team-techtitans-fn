import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditModal from "../editComponent/EditModal"; // Import your modal component
import EditAccountStatus from "../editComponent/EditAccountStatus";

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
    Cell: ({ value }) => {
      let roleText, roleColor, fontWeight;
      switch (value) {
        case 1:
          roleText = "Admin";
          roleColor = "#1a237e";
          fontWeight = 600;
          break;
        case 2:
          roleText = "Seller";
          roleColor = "#b71c1c";
          fontWeight = 600;
          break;
        case 3:
          roleText = "Buyer";
          roleColor = "#004d40";
          fontWeight = 600;
          break;
        default:
          roleText = "Unknown";
          roleColor = "#808080";
          fontWeight = 400;
      }

      return <div style={{ color: roleColor, fontWeight }}>{roleText}</div>;
    },
  },

  {
    Header: "Status",
    accessor: "accountStatus",
    Cell: ({ value }) =>
      value === "active" ? (
        <div className="active-status">{value}</div>
      ) : (
        <div className="inactive-status">{value}</div>
      ),
  },
  {
    Header: "Action",
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

