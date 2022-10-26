
import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import store from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();
    let tries = 0;

    useEffect(() => {
        if (store.session.user != null) {
            store.test.getDataForUser(store.session.user!);
        } else {
            store.session.loadUser().then(() => {
                if (store.session.user != null) {
                    store.test.getDataForUser(store.session.user!);
                }
            });
        }
    }, [navigate]);

    const items = (store.test.data as Order[])?.map((order: Order) => (
        <Box key={order.id}>
            <Typography variant="h3">{order.advertiserProductName}</Typography>
            Vises fra uge {order.startWeek} til uge {order.endWeek}
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
            {store.test.loading && <LinearProgress />}
            <Typography variant="h2">We got data?</Typography>
            {store.test.data.count < 1 || (store.test.data === null && <p>Not yet...</p>)}
            {store.test.data && <Box>{items}</Box>}
        </Box>
    );
};
export default observer(FrontPage);
