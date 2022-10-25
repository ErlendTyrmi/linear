import { Avatar, Button, Color, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
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

    return (
        <div>
            <Toolbar />

            <Avatar alt="UserImage" src={require('../images/logo.png')} sx={{ width: 160, height: 160, bgcolor: deepPurple[500], marginLeft: '35px' }} />

            <List>
                {['BrugerNavn', 'email@mail.com', 'Log ud', 'Bureau (dropdown)'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
            </List>
        </div>
    );
};

export default observer(SessionMenu);
