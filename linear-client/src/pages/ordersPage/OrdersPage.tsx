import { Box, CircularProgress, Divider, LinearProgress, List, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../../assets/text';
import { Order } from '../../entities/order';
import WarningIcon from '@mui/icons-material/WarningAmber';
import store from '../../stores/store';
import { OrderCategory } from '../../utility/orderEnums';
import ToggleFilters from './ToggleFilters';

const OrdersPage = () => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Add selectedADvertoser as filter category
        store.order.addPresetFilter(OrderCategory.selectedAdvertiser);

        if (store.session.user === null) store.session.loadUser();

        store.order.loadOrders();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const items = (store.order.getOrdersWithFiltersAndSearch(store.order.presetFilters, searchText) as Order[]).map((order: Order) => (
        <Box key={order.id}>
            <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
                {order.orderTotal > order.orderBudget && <WarningIcon color="warning" sx={{ paddingRight: 1 }} />}
                <Typography variant="h3">{order.advertiserProductName}</Typography>
            </Box>
            <Typography>
                Vises fra {order.startDate.getDate()} {appText.metaLocaleMonth(order.startDate.getMonth() + 1)} til {order.endDate.getDate()} {appText.metaLocaleMonth(order.endDate.getMonth() + 1)}
            </Typography>
            <ul>
                <li>Annoncør: {order.advertiserName}</li>
                <li>{order.salesProductName}-ordre</li>
                <li>Budget: {order.orderBudget}</li>
                <li>Status: {order.orderStatus}</li>
                {order.orderTotal > order.orderBudget && <li>{`${order.orderTotal - order.orderBudget} ${appText.ordersIsOverBudgetSummary()}`}</li>}
            </ul>
        </Box>
    ));

    return (
        <div>
            {store.order.loading && <LinearProgress />}
            <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Typography variant="h1">{appText.orderHeader()}</Typography>
                <Divider />
                <ToggleFilters />

                <TextField autoFocus margin="dense" id="filter" label={appText.filter()} type="text" fullWidth variant="standard" value={searchText} onChange={handleSearch} />

                {store.advertiser.data.length > 0 ? <List>{items}</List> : <CircularProgress color="inherit" />}
            </Box>
        </div>
    );
};
export default observer(OrdersPage);
