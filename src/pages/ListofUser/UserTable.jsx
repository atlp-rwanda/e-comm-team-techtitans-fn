import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../Redux/Features/User/viewUser/view.slice";
import { COLUMNS } from "../../components/Table/columns";
import Table from "../../components/Table/";

const UserTable = () => {
  const dispatch = useDispatch();
  const { allusers, status } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, []);
  const data = allusers?.data || [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error occurred while fetching users.</div>;
  }

  return <Table columns={columns} data={data} />;
};

export default UserTable;
