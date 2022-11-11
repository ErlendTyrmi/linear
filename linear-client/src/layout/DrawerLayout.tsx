import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import store from '../stores/store';
import { MainMenu } from '../menu/MainMenu';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import SessionMenu from '../menu/SessionMenu';
import TopMenu from '../menu/TopMenu';

const drawerWidth = 240;

interface Props {
    children: any;
}

const DrawerLayout = (props: Props) => {
    const { children } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [sessionMenuOpen, setSessionMenuOpen] = useState(false);

    useEffect(() => {
        if (store.advertiser.advertisers.length > 0) return;
        store.advertiser.loadAdvertisers();
        store.advertiser.loadFavorites();
        if (store.agency.data === null) store.agency.loadAgency();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Main Menu - Mobile and destop drawers */}
            {<TopMenu setMenuOpen={setMenuOpen.bind(this)} setSessionMenuOpen={setSessionMenuOpen.bind(this)} drawerWidth={drawerWidth} />}

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
