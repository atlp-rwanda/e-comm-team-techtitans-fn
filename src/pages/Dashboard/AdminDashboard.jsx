/* eslint-disable prettier/prettier */
import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import { Card, Space, Typography, Statistic } from "antd";
import { Pie } from '@ant-design/plots';
// import { Line } from '@ant-design/plots';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import "../../styles/interface.scss";
import { getAllUsers } from "../../Redux/Features/User/viewUser/view.slice";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import { getAllSellerOrder } from "../../Redux/Features/Order/sellerOrder.slice";



const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { allusers } = useSelector((state) => state.allUsers);
    const { products } = useSelector((state) => state.products);
    const { orders, status, error } = useSelector((state) => state.orders);
    useEffect(() => {
    dispatch(getAllUsers());
    // }, [dispatch]);
}, []);

    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);


      
      useEffect(() => {
        dispatch(getAllSellerOrder());
      }, [dispatch]);
    


     
        const data = [
          {
            type: 'Users',
            value: allusers?.data?.length,
          },
          {
            type: 'Product',
            value: products.length,
          },
          {
            type: 'Orders',
            value: orders.length,
          },
          
        ];
        const config = {
          appendPadding: 10,
          data,
          angleField: 'value',
          colorField: 'type',
          radius: 1,
          innerRadius: 0.6,
          label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
              textAlign: 'center',
              fontSize: 14,
            },
          },
          interactions: [
            {
              type: 'element-selected',
            },
            {
              type: 'element-active',
            },
          ],
          statistic: {
            title: false,
            content: {
              style: {
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            },
          },
        };


  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <Typography.Title>Admin Dashboard</Typography.Title>
        
           
          <Space direction="horizontal" style={{ gap: "6rem" }}>
          
            <Card style={{ width: "24rem" }}>
            <Typography.Title level={5}  direction="vertical">Total Users </Typography.Title>
              <Space direction="horizontal" style={{ gap: "6rem" }}>
                <Statistic  value={allusers?.data?.length} /> 
                
              </Space>
            </Card>
            <Card style={{ width: "24rem" }}>
            <Typography.Title level={5}  direction="vertical">Total Product </Typography.Title>
              <Space direction="horizontal" style={{ gap: "6rem" }}>

                <Statistic  value={products.length} />
                
              </Space>
            </Card>
            <Card style={{ width: "24rem" }}>
            <Typography.Title level={5}  direction="vertical">Total Orders </Typography.Title>
              <Space direction="horizontal" style={{ gap: "6rem" }}>
                <Statistic  value={orders.length} />
                
              </Space>
            </Card>
            
          </Space>
          <div className="chart-box2">
          <div className="div-chart2">
          <h1 className="revenue-title"></h1>
          <Pie {...config} />
          
          </div>
         
          </div>

        </Content>
        <SideBar />
      </div>
    </>
  );
};

export default AdminDashboard;