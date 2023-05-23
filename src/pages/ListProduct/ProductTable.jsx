import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../Redux/Features/viewUser/view.slice";
import { COLUMNS } from "../../components/Table/columns";
import Table from "../../components/Table/";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { allusers, status } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers(1));
  }, [dispatch]);

  const columns = useMemo(() => COLUMNS, []);
  const data = allusers?.data || [];
  console.log("data: *****************", allusers);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error occurred while fetching users.</div>;
  }

  return <Table columns={columns} data={data} />;
};

export default ProductTable;
