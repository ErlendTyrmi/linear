import { Box, Typography, Divider, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/appText';
import store from '../../stores/store';
import { OrderAdvertiserScope, OrderFilter } from '../../utility/orderEnums';

const StatusSegment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (store.advertiser.isLoading === false && store.advertiser.getSelectedAdvertiser()) store.advertiser.loadFavorites();
        if (store.order.isLoading === false && store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.none, null).length < 1) store.order.loadOrders();
    }, []);

    return (
        <div>
            <Typography variant="h2">{appText.menuStatus()}</Typography>
            <Divider />
            <Typography variant="subtitle1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                {store.advertiser.getSelectedAdvertiser()?.name ?? appText.advertiserMissing()}
            </Typography>

            <Typography>{store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.none, null).length} ordre</Typography>
            <Typography>{store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.overBudget, null).length} er over budget</Typography>
            <Button
                size="small"
                sx={{ paddingLeft: 0 }}
                onClick={() => {
                    navigate('/status');
                }}
            >
                {appText.statusReadMore()}
            </Button>
        </div>
    );
};

export default observer(StatusSegment);
