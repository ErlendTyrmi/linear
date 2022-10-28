import {
    Avatar,
    Box,
    Button,
    Color,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { deepPurple } from '@mui/material/colors';
import { collectStoredAnnotations } from 'mobx/dist/internal';
import theme from '../theme';
import { Advertiser } from '../entities/advertiser';

interface Props {
    setOpen: any;
}

const SessionMenu = (props: Props) => {
    const closeMenu = () => props.setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.advertiser.data.length > 0) return;
        let user = store.session.user;
        if (user != null) {
            store.advertiser.getDataForUser(user.id);
        }
    }, []);

    const handleLogout = () => {
        closeMenu();
        store.session.logout();
        navigate('/login');
    };

    let name = store.session.user?.name ?? 'N N';

    const advertisers = (store.advertiser.data as Advertiser[])?.map((advertiser: Advertiser) => <MenuItem value={advertiser.id}>{advertiser.name}</MenuItem>);

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Toolbar />
                <Grid container justifyContent="center">
                    <Avatar alt={name} sx={{ width: 160, height: 160, bgcolor: 'primary.main', margin: 1 }}>
                        {name}
                    </Avatar>
                </Grid>

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
                    {store.advertiser.data && (
                        <ListItem>
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{appText.advertiserLabel['da']}</InputLabel>
                                    <Select
                                        labelId="advertiserlabel"
                                        id="demo-simple-select"
                                        value={store.advertiser.selected}
                                        label={appText.advertiserLabel['da']}
                                        onChange={(event: SelectChangeEvent) => {
                                            store.advertiser.setSelected(event.target.value as string);
                                        }}
                                    >
                                        {advertisers}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ListItem>
                    )}
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
            </ThemeProvider>
        </Box>
    );
};

export default observer(SessionMenu);
