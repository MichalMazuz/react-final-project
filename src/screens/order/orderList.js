import axios from 'axios';
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders } from '../../features/order/orderSlice';

export default function OrderList() {
    const userFromRedux = useSelector(s => s.user.currentUser);
    const typeFromRedux = useSelector(s => s.user.type);
    const arrFromRedux = useSelector(s => s.order.arrOrder);
    const statusFetchData = useSelector(s => s.order.status);
    const dispatch = useDispatch();

    console.log(arrFromRedux);

    useEffect(() => {
        fetchAllOrdersList();
    }, []);

    const fetchAllOrdersList = async () => {
        if (statusFetchData === "idle") {
            dispatch(fetchAllOrders());
        }
    };

    const filterArrOrders = typeFromRedux === 'user' ? arrFromRedux.filter(order => order.userId === userFromRedux.id) : arrFromRedux;

    return (
        <>
            <h1>All Orders</h1>
            <Grid container spacing={2}>
                {filterArrOrders.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={item.name}
                                        src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                    />
                                }
                                title={`Order Date: ${item.orderDate}`}
                                subheader={`Due Date: ${item.dueDate}`}
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
