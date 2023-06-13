import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditStatus from "../editComponent/EditOrderStatus";

export const COLUMNS = [
  {
    Header: "No.",
    accessor: "orderId",
    Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "Customer",
    accessor: "customer.name",
  },
  {
    Header: "Email",
    accessor: "customer.email",
  },
  {
    Header: "Product",
    accessor: "product.name",
  },
  {
    Header: "Quantity",
    accessor: "orderQuantity",
  },
  {
    Header: "Status",
    accessor: "orderStatus",
    Cell: ({ value }) => {
      let statusColor = "";

      switch (value) {
        case "shipped":
          statusColor = "#7A89E9"; // Blue
          break;
        case "delivered":
          statusColor = "#28a745"; // Green
          break;
        case "cancelled":
          statusColor = "#FF0000"; // Red
          break;
        case "refunded":
          statusColor = "#FFA500"; // Orange
          break;
        case "onhold":
          statusColor = "#FFC0CB"; // Pink
          break;
        default:
          statusColor = "#000000"; // Black (or fallback color)
      }

      return (
        <div
          style={{
            color: statusColor,
            fontWeight: "600",
            padding: "5px",
            textTransform: "capitalize",
          }}
        >
          {value}
        </div>
      );
    },
  },
  {
    Header: "Action",
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const { orderId, orderStatus } = row.original;
      const navigate = useNavigate();
      const openModal = (orderId) => {
        setShowModal(true);
      };
      const closeModal = () => {
        setShowModal(false);
        navigate(`/listorders`);
      };

      return (
        <div className="action">
          <i className="bx bxs-edit" onClick={() => openModal(orderId)}></i>
          {showModal && (
            <EditStatus
              orderId={orderId}
              orderStatus={orderStatus}
              closeModal={closeModal}
            />
          )}
        </div>
      );
    },
  },
];
