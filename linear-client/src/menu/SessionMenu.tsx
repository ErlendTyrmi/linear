import { Avatar, Button, Color, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { deepPurple } from '@mui/material/colors';

const SessionMenu = () => {
    const navigate = useNavigate();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    const handleLogout = () => {
        store.ui.setSessionMenuOpen(false);
        store.session.logout().then((response) => {
            if ((response.status as number) !== 200) {
                store.message.setError(appText.error['da']);
            }
            store.session.clear();
            navigate('/login');
        });
    };

    let name = store.session.user?.name ?? 'N N';

    return (
        <div>
            <Toolbar />

            {/* <Avatar alt="UserImage" src={require('../images/logo.png')} sx={{ width: 160, height: 160, bgcolor: deepPurple[500], marginLeft: '35px' }} /> */}
            <Avatar alt={name} sx={{ width: 160, height: 160, bgcolor: deepPurple[500], marginLeft: '35px' }}>
                {name}
            </Avatar>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={store.session.user?.name} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={store.session.user?.email} />
                </ListItem>
                <ListItem disablePadding></ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};

export default observer(SessionMenu);
