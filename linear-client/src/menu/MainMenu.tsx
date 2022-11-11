import { List, ListItem, ListItemButton, ListItemText, Divider, Toolbar, Button, useTheme, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../App';
import store from '../stores/store';

interface Props {
    setOpen: any;
}

export const MainMenu = (props: Props) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const close = () => props.setOpen(false);

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
            <Box id="Spacer" sx={{ flex: '1' }}>
                {' '}
            </Box>
            <List>
                <ListItem key="manu-warnings">
                    <Divider />
                    <ListItemText>
                        <Typography variant="h3">Alle dine ordre</Typography>
                        <Typography>{store.order.getOrdersForAllFavoriteAdvertisers()?.length} ordre.</Typography>
                        <Typography>{store.order.getOrdersOverBudgetForAllSelected()?.length} er over budget.</Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    );
};
