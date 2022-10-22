import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import store from '../stores/store';
import { MainMenuDrawer } from './MainMenuDrawer';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const drawerWidth = 240;

interface Props {
    children: any;
}

const DrawerLayout = (props: Props) => {
    const { children } = props;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => store.ui.setMenuOpen(true)} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: '1' }}>
                        TVX linear
                    </Typography>
                    <Button color="inherit" endIcon>
                        {store.session.user?.name ?? 'session'}
                        <PersonIcon />
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Menu - Mobile and destop drawers */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={store.ui.menuOpen}
                    onClose={() => store.ui.setMenuOpen(false)}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {<MainMenuDrawer />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    <Toolbar>
                        <IconButton onClick={() => console.log('clicked home button')}>
                            {/* <ChevronLeftIcon /> */}
                            <Typography variant="h6">TVX</Typography>
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    {<MainMenuDrawer />}
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
