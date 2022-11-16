import { Box, Typography, Divider, LinearProgress, List, ListItem, ListItemButton, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/text';
import { Order } from '../../entities/order';
import store from '../../stores/store';
import { OrderCategory, OrderStatus } from '../../utility/orderEnums';

const OrderSegment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (store.order.data.length < 1 && store.order.loading === false) {
            store.order.loadOrders();
        }
    }, []);

    const items = (
        store.order
            .getOrdersWithFiltersAndSearch([OrderCategory.selectedAdvertiser], null)
            .filter((it) => {
                return it.orderStatus === OrderStatus.created;
                console.log(it.orderStatus);
            })
            .slice(0, 4) as Order[]
    )?.map((order: Order) => (
        <ListItem disablePadding key={order.id}>
            <ListItemButton onClick={() => navigate('/order')}>
                <Box sx={{ flexDirection: 'vertical' }}>
                    <Typography>{order.advertiserProductName}</Typography>
                    <Typography variant="subtitle1">{/* Vises fra {order.startDate.getDay()} {appText.metaLocaleMonth(order.startDate.getMonth())} til {order.endDate.getDate()} */}</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <div>
            {store.order.loading && <LinearProgress />}
            <Typography variant="h2">Ordre</Typography>
            <Divider />
            <Typography variant="subtitle1" sx={{ paddingTop: 1 }}>
                {store.advertiser.getSelectedAdvertiser()?.name ?? appText.advertiserMissing()}
            </Typography>

            {store.order.data ? <List sx={{ padding: 0, margin: 0 }}>{items}</List> : appText.orderNoneFound()}

            <Button
                size="small"
                sx={{ paddingLeft: 0 }}
                onClick={() => {
                    navigate('/order');
                }}
            >
                {appText.orderSeeMore()}
            </Button>
        </div>
    );
};

export default observer(OrderSegment);
