import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MainMenu from '../menu/MainMenu';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import SessionMenu from '../menu/SessionMenu';
import TopMenu from '../menu/TopMenu';
import store from '../stores/store';
import { Footer } from '../menu/Footer';
import theme from '../theme';

const drawerWidth = 240;

interface Props {
    children: any;
}

const DrawerLayout = (props: Props) => {
    const { children } = props;
    const [sessionMenuOpen, setSessionMenuOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />

            {/* Main Menu - Mobile and destop drawers */}
            {<TopMenu setSessionMenuOpen={setSessionMenuOpen.bind(this)} drawerWidth={drawerWidth} />}

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={store.ui.mobileMenuOpen}
                    onClose={() => store.ui.setMobileMenuOpen(false)}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {<MainMenu />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {<MainMenu />}
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
            <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Box sx={{ flex: 1 }}>{children}</Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default observer(DrawerLayout);
