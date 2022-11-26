import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '../App';
import store from '../stores/store';
import { OrderAdvertiserScope, OrderFilter } from '../utility/orderEnums';

const MainMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const close = () => store.ui.setMobileMenuOpen(false);

    const handleMenuNavigation = (url: string) => {
        switch (url) {
            case '/booking':
                store.booking.setIsNewOrder(true);
                store.booking.setCurrentOrder(null);
                break;
            case '/order':
                store.order.setFilter(OrderFilter.none);
                store.order.setScope(OrderAdvertiserScope.selectedAdvertiser);
                break;
        }
        close();
        navigate(url);
    };
    return (
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                    <ListItemButton selected={item.url === location.pathname} onClickCapture={() => handleMenuNavigation(item.url)}>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default observer(MainMenu);
