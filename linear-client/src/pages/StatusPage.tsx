import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { appText } from '../assets/appText';
import { Order } from '../entities/order';
import OverBudgetArea from '../menu/OverBudgetArea';
import store from '../stores/store';
import { OrderAdvertiserScope, OrderFilter } from '../utility/orderEnums';
import StatusSegment from './FrontPage/StatusSegment';

const StatusPage = () => {
    useEffect(() => {
        if (store.session.user === null && store.session.isLoading === false) store.session.loadUser();
    }, []);

    return (
        <div>
            {store.order.isLoading && <LinearProgress />}
            <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Typography variant="h1">{appText.statusHeader()}</Typography>
                <Divider />
                <Typography>{appText.pageNotImplemented()}</Typography>
                <Typography variant="subtitle1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {store.advertiser.getSelectedAdvertiser()?.name ?? appText.advertiserMissing()}
                </Typography>

                <Typography>{store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.none, null).length} ordre</Typography>
                <Typography>{store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.overBudget, null).length} er over budget</Typography>
            </Box>
        </div>
    );
};
export default observer(StatusPage);
