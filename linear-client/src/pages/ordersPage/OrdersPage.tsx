import { Box, Button, Divider, Grid, IconButton, LinearProgress, List, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../../assets/appText';
import { Order } from '../../entities/order';
import WarningIcon from '@mui/icons-material/WarningAmber';
import store from '../../stores/store';
import { OrderAdvertiserScope } from '../../utility/orderEnums';
import ToggleFilters from './ToggleFilters';
import ResetIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/AddCircleOutline';

const OrdersPage = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        store.order.setScope(OrderAdvertiserScope.selectedAdvertiser);
        if (store.session.user === null) store.session.loadUser();
        store.order.loadOrders();
    }, []);

    const onClickEdit = (order: Order) => {
        store.booking.setIsNewOrder(false);
        store.booking.setCurrentOrder(order);
        navigate('/booking');
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const items = (store.order.getOrdersWithFiltersAndSearch(store.order.advertiserScope, store.order.filter, searchText) as Order[]).map((order: Order) => (
        <Box key={order.id} sx={{ padding: 1, marginBottom: 3 }}>
            <Grid container key={order.id} sx={{ display: 'flex', flexDirection: 'row' }} spacing="2">
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="h3" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {order.advertiserProductName}
                        </Typography>
                    </Box>
                    <Typography>
                        {order.startDate.getDate()} {appText.metaLocaleMonth(order.startDate.getMonth() + 1)} til {order.endDate.getDate()} {appText.metaLocaleMonth(order.endDate.getMonth() + 1)}
                    </Typography>
                    <Typography variant="body2">{order.salesProductName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                    {' '}
                    <ul>
                        <li>
                            <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{`${appText.orderItemAdvertiser()}: ${order.advertiserName}`}</Typography>
                        </li>
                        <li>
                            <Typography>Budget: {order.orderBudget}</Typography>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={12} md={3} sx={{ wordWrap: 'break-word', overflow: 'hidden' }}>
                    <Typography>Status: {order.orderStatus}</Typography>
                </Grid>
                <Grid item xs={12}>
                    {order.orderTotal > order.orderBudget && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <WarningIcon color="warning" sx={{ paddingRight: 1 }} />
                            <Typography>
                                {order.orderTotal - order.orderBudget} {appText.ordersIsOverBudgetSummary()}
                            </Typography>
                            <Button onClick={() => onClickEdit(order)}>{appText.orderRegulateButton()}</Button>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
        </Box>
    ));

    return (
        <div>
            {store.order.isLoading && <LinearProgress />}
            <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                    <Typography variant="h1" flex="1">
                        {appText.orderHeader()}
                    </Typography>
                    <Button
                        sx={{ marginLeft: 1 }}
                        onClickCapture={() => {
                            store.booking.setIsNewOrder(true);
                            navigate('/booking');
                        }}
                    >
                        <AddIcon />
                        {appText.bookingCreateNewButton()}
                    </Button>
                </Box>

                <Divider />

                <Box sx={{ marginBottom: 2, marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1, alignItems: 'center' }}>
                        <TextField
                            sx={{ minWidth: '300px' }}
                            autoFocus
                            id="search-filter"
                            label={`${appText.search()} ${appText.onOrderName()}`}
                            type="text"
                            variant="standard"
                            value={searchText}
                            onChange={handleSearch}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        sx={{ visibility: searchText.length > 0 ? 'visible' : 'hidden' }}
                                        onClick={() => {
                                            setSearchText('');
                                        }}
                                    >
                                        <ResetIcon />
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                    <ToggleFilters />
                </Box>

                {store.order.getOrdersWithFiltersAndSearch(store.order.advertiserScope, store.order.filter, searchText).length > 0 ? (
                    <List>{items}</List>
                ) : (
                    <Typography>{appText.orderNoneFound()}</Typography>
                )}
            </Box>
        </div>
    );
};
export default observer(OrdersPage);
