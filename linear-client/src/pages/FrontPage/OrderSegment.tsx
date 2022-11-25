import { Box, Typography, Divider, LinearProgress, List, ListItem, ListItemButton, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/appText';
import { Order } from '../../entities/order';
import orderStore from '../../stores/orderStore';
import store from '../../stores/store';
import { OrderAdvertiserScope, OrderFilter, OrderStatus } from '../../utility/orderEnums';

const OrderSegment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (store.order.data.length < 1 && store.order.isLoading === false) {
            store.order.loadOrders();
        }
    }, []);

    const items = (
        store.order
            .getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.none, null)
            .filter((it) => {
                return it.orderStatus === OrderStatus.created;
            })
            .slice(0, 5) as Order[]
    )?.map((order: Order) => (
        <ListItem disablePadding key={order.id}>
            <ListItemButton onClick={() => navigate('/order')}>
                <Box sx={{ flexDirection: 'vertical' }}>
                    <Typography>{order.advertiserProductName}</Typography>
                </Box>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <div>
            <Typography variant="h2">{appText.orderSegmentHeader()}</Typography>
            <Divider />
            {store.order.isLoading && <LinearProgress />}
            <Typography variant="subtitle1" sx={{ paddingTop: 1 }}>
                {store.advertiser.getSelectedAdvertiser()?.name ?? appText.advertiserMissing()}
            </Typography>

            {store.order.data ? <List sx={{ padding: 0, margin: 0 }}>{items}</List> : appText.orderNoneFound()}

            <Button
                size="small"
                sx={{ paddingLeft: 0 }}
                onClick={() => {
                    orderStore.setScope(OrderAdvertiserScope.selectedAdvertiser);
                    orderStore.setFilter(OrderFilter.none);
                    navigate('/order');
                }}
            >
                {appText.orderSeeMore()}
            </Button>
        </div>
    );
};

export default observer(OrderSegment);
