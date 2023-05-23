import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";
import { getAllUsers } from "../../Redux/Features/viewUser/view.slice";
import { COLUMNS } from "./columns";

const UserTable = () => {
  const dispatch = useDispatch();
  const { allusers, status } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers(1));
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, []);
  const data = allusers?.data || [];
  console.log("data: *****************", allusers);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error occurred while fetching users.</div>;
  }

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
