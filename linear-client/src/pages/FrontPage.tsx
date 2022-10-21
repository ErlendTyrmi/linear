import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import store from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();
    let tries = 0;

    useEffect(() => {
        // Handled in protectedroute :^)
        // if (store.session.user === null) {
        //     navigate('/login');
        // }
        store.test.getData();
    }, [navigate, store.session]);

    return (
        <Box>
            {store.test.loading && <LinearProgress />}
            <h1>We got data?</h1>
            {store.test.data.count < 1 && <p>Not yet...</p>}
            {store.test.data &&
                (store.test.data as Order[]).map((order: Order) => (
                    <Card>
                        <Typography variant="h2">{order.advertiserProductName}</Typography>
                        <ul>
                            <li>Annoncør: {order.advertiserName}</li>
                            <li>Dette er en {order.salesProductName}-ordre.</li>
                            <li>Budget: {order.orderBudget}</li>
                            <li>Status: {order.orderStatus}</li>
                        </ul>
                        Vises fra uge {order.startWeek} til uge {order.endWeek}
                    </Card>
                ))}
        </Box>
    );
};
export default observer(FrontPage);
