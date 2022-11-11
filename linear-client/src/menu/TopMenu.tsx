import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import { Advertiser } from '../entities/advertiser';
import TopMenuAdvertiserSelect from './TopMenuAdvertiserSelect';
import { useNavigate } from 'react-router-dom';

interface Props {
    setMenuOpen: any;
    setSessionMenuOpen: any;
    drawerWidth: number;
}

const TopMenu = (props: Props) => {
    const setMenuOpen = props.setMenuOpen;
    const setSessionMenuOpen = props.setSessionMenuOpen;
    const drawerWidth = props.drawerWidth;
    const navigate = useNavigate();

    const advertisers = (store.advertiser.advertisers as Advertiser[])?.map((advertiser: Advertiser) => (
        <MenuItem key={advertiser.id} value={advertiser.id}>
            {advertiser.name}
        </MenuItem>
    ));

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
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => setMenuOpen(true)} sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: '1' }}>
                    <IconButton
                        onClickCapture={() => {
                            navigate('/');
                        }}
                        sx={{ display: { xs: 'inline-block', sm: 'none' } }}
                    >
                        <img src={require('../assets/images/tv_x_logo_mini.png')} height="16" />
                    </IconButton>
                </Box>
                <TopMenuAdvertiserSelect />
                <Button color="inherit" onClick={() => setSessionMenuOpen(true)} startIcon={<PersonIcon />}>
                    {store.session.user?.userName ?? appText.noUserName()}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default observer(TopMenu);
