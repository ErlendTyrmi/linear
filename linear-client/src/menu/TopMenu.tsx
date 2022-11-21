import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { appText } from '../assets/appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import WarningIcon from '@mui/icons-material/WarningAmber';
import { observer } from 'mobx-react-lite';
import AdvertiserSelectMenu from './AdvertiserSelectMenu';
import { useNavigate } from 'react-router-dom';
import { OrderAdvertiserScope, OrderFilter as OrderFilter } from '../utility/orderEnums';

interface Props {
    setSessionMenuOpen: any;
    drawerWidth: number;
}

const TopMenu = (props: Props) => {
    const setSessionMenuOpen = props.setSessionMenuOpen;
    const drawerWidth = props.drawerWidth;
    const navigate = useNavigate();
    let warningsAmount = store.order.getOrdersWithFiltersAndSearch(OrderAdvertiserScope.allFavorites, OrderFilter.overBudget, null).length;

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => store.ui.setMobileMenuOpen(true)} sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuIcon />
                    {warningsAmount > 0 && <WarningIcon color="warning" />}
                </IconButton>
                <Box sx={{ flexGrow: '1' }}>
                    <IconButton
                        onClickCapture={() => {
                            navigate('/');
                        }}
                        sx={{ display: { xs: 'inline-block', sm: 'none' } }}
                    >
                        <img src={require('../assets/images/logo.png')} height="22" />
                    </IconButton>
                </Box>
                <AdvertiserSelectMenu />
                <Button disabled={store.session.isLoading || store.agency.isLoading} color="inherit" onClick={() => setSessionMenuOpen(true)} startIcon={<PersonIcon />}>
                    {store.session.user?.userName ?? appText.noUserName()}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default observer(TopMenu);
