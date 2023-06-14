import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSellerOrder } from "../../Redux/Features/Order/sellerOrder.slice";
import { COLUMNS } from "../../components/Table/orderColumns";
import Table from "../../components/Table/";

const UserTable = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getAllSellerOrder());
  }, [dispatch]);
  const columns = useMemo(() => COLUMNS, []);
  const data = orders?.data || [];

  console.log("******** data *****", data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    if (error?.message === "Rejected") {
      return <div>Error: {error.message}</div>;
    }
  }

  return <Table columns={columns} data={data} />;
};

export default UserTable;
