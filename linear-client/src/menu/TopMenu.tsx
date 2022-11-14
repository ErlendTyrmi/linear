import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import AdvertiserSelectMenu from './AdvertiserSelectMenu';
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
                        <img src={require('../assets/images/screen-x-logo.png')} height="16" />
                    </IconButton>
                </Box>
                <AdvertiserSelectMenu />
                <Button color="inherit" onClick={() => setSessionMenuOpen(true)} startIcon={<PersonIcon />}>
                    {store.session.user?.userName ?? appText.noUserName()}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default observer(TopMenu);
