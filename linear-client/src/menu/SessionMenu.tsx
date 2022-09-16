import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { linearAPI } from '../network/api';

export const SessionMenu = () => {
    const navigate = useNavigate();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleLogin = () => {
        navigate('/dashboard');
        handleClose();
    };

    const handleLogout = () => {
        navigate('/');
        handleClose();

        linearAPI.get('/session/logout').then((response) => {
            if (response.status !== 200) return;
            console.log('Logged out');
        });
    };

    return (
        <div>
            <Button id="session-button" aria-controls={open ? 'session-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                Dashboard
            </Button>
            <Menu
                id="session-menu"
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'session-button'
                }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );

    // <Menu>
    //     <ManuItem
    //         onClickCapture={() => {
    //             navigate('/login');
    //         }}
    //     >
    //         login
    //     </Button>
    // </Menu>
};
