import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import store from '../stores/store';

const OtherPage = () => {
    const navigate = useNavigate();
    let tries = 0;

    useEffect(() => {
        console.log('loading other');
        if (store.session.user == null) {
            store.session.getUser();
        }
        store.order.getData();
    }, []);

    return (
        <Box>
            {store.order.loading && <LinearProgress />}
            <Typography variant="h2">Other Page</Typography>
            {store.order.data?.length < 1 && <p>Not yet...</p>}
            {store.order.data &&
                (store.order.data as Order[]).map((order: Order) => (
                    <Box>
                        <Typography variant="h3">{order.advertiserProductName}</Typography>
                        Vises fra uge {order.startWeek} til uge {order.endWeek}
                        <ul>
                            <li>Annoncør: {order.advertiserName}</li>
                            <li>Dette er en {order.salesProductName}-ordre.</li>
                            <li>Budget: {order.orderBudget}</li>
                            <li>Status: {order.orderStatus}</li>
                        </ul>
                    </Box>
                ))}
        </Box>
    );
};
export default observer(OtherPage);
