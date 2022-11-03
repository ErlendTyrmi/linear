import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import store from '../stores/store';
import { MainMenu } from './MainMenu';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import SessionMenu from './SessionMenu';
import { appText } from '../appText';

const drawerWidth = 240;

interface Props {
    children: any;
}

const DrawerLayout = (props: Props) => {
    const { children } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [sessionMenuOpen, setSessionMenuOpen] = useState(false);

    useEffect(() => {
        if (store.advertiser.data.length > 0) return;
        store.advertiser.getAdvertisers();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

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
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: '1' }}>
                        TVX linear
                    </Typography>
                    <Button color="inherit" onClick={() => setSessionMenuOpen(true)} endIcon={<PersonIcon />}>
                        {store.session.user?.name ?? appText.noUserName()}
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Menu - Mobile and destop drawers */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {<MainMenu setOpen={setMenuOpen} />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {<MainMenu setOpen={setMenuOpen} />}
                </Drawer>
            </Box>

            {/* Session Menu */}
            <Box>
                <Drawer
                    anchor="right"
                    variant="temporary"
                    open={sessionMenuOpen}
                    onClose={() => setSessionMenuOpen(false)}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: drawerWidth, sm: 420 } }
                    }}
                >
                    <SessionMenu setOpen={setSessionMenuOpen} />
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default observer(DrawerLayout);
