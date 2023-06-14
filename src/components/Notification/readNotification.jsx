import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GetOneNotification } from '../../Redux/Features/Notification/GetOneNotificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ReadNotification = () => {
    const { id } = useParams();
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const { oneNotification } = useSelector(
        (state) => state.oneNotification
    );
    console.log(oneNotification)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetOneNotification(id));
        console.log('id from readnot...', id)
    }, [dispatch, id]);




    return (
        <>
            <div className="notificationDisplay">
                <div className="notificationN">
                    <div className="notificationN-content">
                        <h3>{oneNotification?.data?.notification?.subject}</h3>
                        <p>{oneNotification?.data?.notification?.body}</p>

                        <p className="notificationStatus">Status:<span>{oneNotification?.data?.notification?.notificationStatus}</span> </p>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ReadNotification