import axios from 'axios';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import { fetchAllUsers } from '../../features/user/userSlice';

export default function OrderList() {
    const arrFromRedux = useSelector((state) => state.user.arrUser);
    const dispatch = useDispatch();
    console.log(arrFromRedux);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <>
            <h1>All Users</h1>
            <Grid container spacing={2} justifyContent="center">
                {arrFromRedux.length && arrFromRedux.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card sx={{ height: '20vh', width: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={item.name}
                                        src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                    />
                                }
                                title={item.name}
                                subheader={item.email}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" component="p">

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
