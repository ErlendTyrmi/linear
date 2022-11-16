import { Box, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Order } from '../entities/order';
import store from '../stores/store';

const BookingPage = () => {
    useEffect(() => {
        if (store.session.user === null) store.session.loadUser();
        store.order.loadOrders();
    }, []);

    const items = (store.order.data as Order[])?.map((order: Order) => (
        <Box key={order.id}>
            <Typography variant="h3">{order.advertiserProductName}</Typography>
            <ul>
                <li>Annoncør: {order.advertiserName}</li>
                <li>Dette er en {order.salesProductName}-ordre.</li>
                <li>Budget: {order.orderBudget}</li>
                <li>Status: {order.orderStatus}</li>
            </ul>
        </Box>
    ));

    return (
        <Box>
            {store.order.loading && <LinearProgress />}
            <Typography variant="h2">You make new order? Yes?</Typography>
            {store.order.data && <Box>{items}</Box>}
        </Box>
    );
};
export default observer(BookingPage);