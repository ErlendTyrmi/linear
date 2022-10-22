import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SessionMenu from './SessionMenu';
import store from '../stores/store';

const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    onClick={() => {
                        store.ui.setMenuOpen(store.ui.menuOpen);
                    }}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        // <div style={{ background: '#f4f4f4' }}>
        //     <Button
        //         onClickCapture={() => {
        //             navigate('/');
        //         }}
        //     >
        //         Home
        //     </Button>
        //     <SessionMenu />
        // </div>
    );
};

export default observer(MainMenu);
