import { Card, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../entities/order';
import store from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        if (dirty === false || store.test.data === '') {
            store.test.getTest();

            if (store.session.getUser() === null) {
                navigate('/login');
            }
        }
        setDirty(true);
    }, [dirty, navigate]);

    return (
        <Typography>
            <h1>We got data</h1>
            <p>UserName: {store.session.user?.name}</p>
            <h2>Data</h2>
            {store.test.data &&
                store.test.data.map((data: Order) => (
                    <Card>
                        <h3>{data.advertiserProductName}</h3>
                        <p>Annoncør: {data.advertiserName}</p>
                        <p>Dette er en {data.salesProductName}-ordre.</p>
                        <p>Budget: {data.orderBudget}</p>
                        <p>Status: {data.orderStatus}</p>
                        <p>
                            Vises fra uge {data.startWeek} til uge {data.endWeek}
                        </p>
                    </Card>
                ))}
        </Typography>
    );
};
export default observer(FrontPage);
