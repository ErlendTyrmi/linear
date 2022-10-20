import { Card, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import { useGet } from '../network/api';
import rootStore from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();
    const [dirty, setDirty] = useState(false);

    // useEffect(() => {
    //     if (dirty === false || rootStore.testStore.data === '') {
    //         rootStore.testStore.getTest();

    //         if (rootStore.sessionStore.getUser() === null) {
    //             navigate('/login');
    //         }
    //     }
    //     setDirty(true);
    // }, [dirty, navigate]);

    // This does not save in store. Very neat, but is it applicable?
    const { data, error, loaded } = useGet('/order/all', {});

    return (
        <Typography>
            <h1>We got data</h1>
            <p>UserName: {rootStore.sessionStore.user?.name}</p>
            <h2>Data</h2>
            {!loaded && <LinearProgress />}
            {data &&
                (data as Order[]).map((order: Order) => (
                    <Card>
                        <h3>{order.advertiserProductName}</h3>
                        <p>Annoncør: {order.advertiserName}</p>
                        <p>Dette er en {order.salesProductName}-ordre.</p>
                        <p>Budget: {order.orderBudget}</p>
                        <p>Status: {order.orderStatus}</p>
                        <p>
                            Vises fra uge {order.startWeek} til uge {order.endWeek}
                        </p>
                    </Card>
                ))}
        </Typography>
    );
};
export default observer(FrontPage);
