import { List, ListItem, ListItemButton, ListItemText, Divider, Toolbar, Button, useTheme, Typography, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../App';
import store from '../stores/store';
import { OrderCategory } from '../utility/orderEnums';
import OverBudgetArea from './OverBudgetArea';

const MainMenu = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const close = () => store.ui.setMobileMenuOpen(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Toolbar>
                <Button
                    onClickCapture={() => {
                        close();
                        navigate('/');
                    }}
                >
                    <img alt="banner-image" src={require('../assets/images/logo_inline.png')} height="27px" />
                </Button>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            onClickCapture={() => {
                                close();
                                navigate(item.url);
                            }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box id="Spacer" sx={{ flex: '1' }}></Box>
            <Divider />

            {store.order.getOrdersWithFiltersAndSearch([OrderCategory.selectedAdvertiser], null).length > 0 && <OverBudgetArea />}
        </Box>
    );
};

export default observer(MainMenu);
