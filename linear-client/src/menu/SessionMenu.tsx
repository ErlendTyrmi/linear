import { Button, Color, Menu, MenuItem, Typography } from '@mui/material';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';

const SessionMenu = () => {
    const navigate = useNavigate();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    // Placement of the dropdown menu
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleLogout = () => {
        handleClose();
        store.session.logout().then((response) => {
            if ((response.status as number) !== 200) {
                store.message.setError(appText.error['da']);
            }
            store.session.clear();
            navigate('/login');
        });
    };

    return (
        <div>
            <Button color="primary" aria-controls={open ? 'session-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                {store.session.user?.name}
                <PersonIcon />
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default observer(SessionMenu);
