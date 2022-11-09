import {
    Avatar,
    Box,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    ThemeProvider,
    Toolbar
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import theme from '../theme';
import { Advertiser } from '../entities/advertiser';

interface Props {
    setOpen: any;
}

const SessionMenu = (props: Props) => {
    const closeMenu = () => props.setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.advertiser.advertisers.length > 0) return;
        store.advertiser.getAdvertisers();
    }, []);

    const handleLogout = () => {
        closeMenu();
        store.session.logout();
        navigate('/login');
    };

    let userName = store.session.user?.userName ?? 'NN';

    const advertisers = (store.advertiser.advertisers as Advertiser[])?.map((advertiser: Advertiser) => <MenuItem value={advertiser.id}>{advertiser.name}</MenuItem>);

    return (
        <Box>
            <ThemeProvider theme={theme}>
                {/* <Toolbar /> */}
                <Toolbar>
                    <IconButton onClick={closeMenu}>
                        <ChevronRightIcon />
                    </IconButton>
                </Toolbar>
                <Grid container justifyContent="center">
                    <Avatar alt={userName} sx={{ width: 160, height: 160, bgcolor: 'primary.main', margin: 1 }}>
                        {userName}
                    </Avatar>
                </Grid>

                <List>
                    <ListItem key="name">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={store.session.user?.name} />
                    </ListItem>
                    <ListItem key="email">
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={store.session.user?.email} />
                    </ListItem>
                    {store.advertiser.advertisers && (
                        <ListItem key="advertiserSelect">
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="advertiserlabel">{appText.advertiserLabel()}</InputLabel>
                                    <Select
                                        labelId="advertiserlabel"
                                        id="advertiserSelect"
                                        value={store.advertiser.selected}
                                        label={appText.advertiserLabel()}
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
                    <ListItem disablePadding key="logout">
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
