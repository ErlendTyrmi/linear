import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import store from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();

    console.log("front page reloadin'");

    useEffect(() => {
        if (store.session.user == null) {
            store.session.setLoading(true);
            store.session.getUser().then((response: AxiosResponse) => {
                store.session.setUser(response.data);
                store.session.setLoading(false);
            });
        }

        store.order.getData().then((response: AxiosResponse) => {
            store.order.setData(response.data);
            store.order.setLoading(false);
        });
    }, []);

    const items = (store.order.data as Order[])?.map((order: Order) => (
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
            {store.order.loading && (
                <Box sx={{ position: 'absolute', top: 0 }}>
                    <LinearProgress />
                </Box>
            )}
            <Typography variant="h2">We got data?</Typography>
            {store.order.data && <Box>{items}</Box>}
        </Box>
    );
};
export default observer(FrontPage);
