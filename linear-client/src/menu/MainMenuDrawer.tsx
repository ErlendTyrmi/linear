import {Divider, Toolbar, Button, Box} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';
import { OrderAdvertiserScope, OrderFilter } from '../utility/orderEnums';
import MainMenu from './MainMenu';
import OverBudgetArea from './OverBudgetArea';

const MainMenuDrawer = () => {
    const navigate = useNavigate();
    const close = () => store.ui.setMobileMenuOpen(false);

    useEffect(() => {
        // Load all basic data if null and not loading
        if (store.session.user === null && store.session.isLoading === false) store.session.loadUser();

        if (store.agency.data === null && store.agency.isLoading === false) store.agency.loadAgency();

        if (store.advertiser.data.length < 1 && store.advertiser.isLoading === false) {
            store.advertiser.loadFavorites();
            store.advertiser.loadAdvertisers();
        }

        if (store.order.data.length < 1 && store.order.isLoading === false) store.order.loadOrders();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Toolbar>
                <Button
                    onClickCapture={() => {
                        close();
                        navigate('/');
                    }}
                >
                    <img alt="banner" src={require('../assets/images/logo_inline.png')} height="27px" />
                </Button>
            </Toolbar>
            <Divider />
            <MainMenu />
            <Divider />
            <Box id="Spacer" sx={{ flex: '1' }}></Box>
            <Divider />

            {store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.selectedAdvertiser, OrderFilter.none, null).length > 0 && <OverBudgetArea />}
        </Box>
    );
};

export default observer(MainMenuDrawer);
