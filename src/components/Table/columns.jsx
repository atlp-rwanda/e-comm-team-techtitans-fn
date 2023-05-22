import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Full Name",
    accessor: "full_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <div>
        <Link to={`/edit/${row.id}`}>
          <i class="bx bxs-edit "></i>
        </Link>
        <Link to={`/edit/${row.id}`}>
          <i class="bx bxs-trash "></i>
        </Link>

      </div>
    ),
  },
];
