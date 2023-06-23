/* eslint-disable prettier/prettier */
import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import { Card, Space, Typography, Statistic } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

// import { Line } from "react-chartjs-2";
import { Line } from '@ant-design/plots';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStats } from "../../Redux/Features/Statistics/statistics.slice";

import "../../styles/interface.scss";

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale);

const Dashboard = () => {

  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDateOfMonth = currentDate.getDate();

  console.log(`${currentYear}-${currentMonth}-${currentDateOfMonth}`);

  const { getstats } = useSelector((state) => state.getstats);
  console.log("***get your stats***", getstats);
  const { status, error } = useSelector((state) => state.getstats);
  const [startDate, setStartDate] = useState("2023-06-10");
  const [endDate, setEndDate] = useState("2023-06-23");
  // const [data, setData] = useState([]);
  

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getStats({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);



  if (!getstats) {
    return null;
  }

  const { pending, processing, shipped, delivered } = getstats.stats; // Updated line
  const salesData = [
    {
      type: "PENDING",
      sales: pending.orders,
    },
    {
      type: "PROCESSING",
      sales: processing.orders,
    },
    {
      type: "DELIVERED",
      sales: delivered.orders,
    },
    {
      type: "SHIPPED",
      sales: shipped.orders,
    },
  ];

  const salesConfig = {
    data: salesData,
    xField: "type",
    yField: "sales",
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      sales: {
        alias: "orders",
      },
    },
  };

  const revenueData = [
    {
      type: "PENDING",
      revenue: pending.revenue,
    },
    {
      type: "PROCESSING",
      revenue: processing.revenue,
    },
    {
      type: "DELIVERED",
      revenue: delivered.revenue,
    },
    {
      type: "SHIPPED",
      revenue: shipped.revenue,
    },
  ];

  const revenueConfig = {
    data: revenueData,
    xField: "type",
    yField: "revenue",
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      revenue: {
        alias: "revenue",
      },
    },
  };



  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <Typography.Title>Dashboard</Typography.Title>
          
          <input
          className="date-btn-stat"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
             className="date-btn-stat"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
           
          <Space direction="horizontal" style={{ gap: "5rem" }}>
          
            <Card style={{ width: "18rem" }}>
            <Typography.Title level={5}  direction="vertical">PENDING </Typography.Title>
              <Space direction="horizontal" style={{ gap: "4rem" }}>
                <Statistic title=" Orders" value={pending.orders}  />
                <Statistic title=" Revenue" value={pending.revenue} />
              </Space>
            </Card>
            <Card style={{ width: "18rem" }}>
            <Typography.Title level={5}  direction="vertical">PROCESSING </Typography.Title>
              <Space direction="horizontal" style={{ gap: "4rem" }}>

                <Statistic title=" Orders" value={processing.orders} />
                <Statistic title=" Revenue" value={processing.revenue} />
              </Space>
            </Card>
            <Card style={{ width: "18rem" }}>
            <Typography.Title level={5}  direction="vertical">DELIVERED </Typography.Title>
              <Space direction="horizontal" style={{ gap: "4rem" }}>
                <Statistic title="Orders" value={delivered.orders} />
                <Statistic title=" Revenue" value={delivered.revenue} />
              </Space>
            </Card>
            <Card style={{ width: "18rem" }}>
            <Typography.Title level={5}  direction="vertical">SHIPPED </Typography.Title>
              <Space direction="horizontal" style={{ gap: "4rem" }}>
                <Statistic title=" Orders" value={shipped.orders} />
                <Statistic title=" Revenue" value={shipped.revenue} />
              </Space>
            </Card>
          </Space>
          <div className="chart-box">
          <div className="div-chart">
          <h1 className="revenue-title">REVENUE</h1>
          <Line {...revenueConfig} />
         
            
            
          </div>
          <div className="div-chart">
          <h1 className="order-title">ORDERS</h1>
          <Line {...salesConfig} />
          
            
          </div>
          </div>
        </Content>
        <SideBar />
      </div>
    </>
  );
};

export default Dashboard;