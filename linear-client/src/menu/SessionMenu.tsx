import {
    Avatar,
    Box,
    Button,
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
    Modal,
    Select,
    SelectChangeEvent,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../theme';
import { Advertiser } from '../entities/advertiser';
import { style } from '@mui/system';

interface Props {
    setOpen: any;
}

const SessionMenu = (props: Props) => {
    const [advertiserModalOpen, setAdvertiserModalOpen] = useState(false);
    const closeMenu = () => props.setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.agency.data === null) store.agency.loadAgency();
    }, []);

    const handleLogout = () => {
        closeMenu();
        store.session.logout();
        navigate('/login');
    };

    let userName = store.session.user?.userName ?? 'NN';

    // const advertisers = (store.advertiser.advertisers as Advertiser[])?.map((advertiser: Advertiser) => (
    //     <MenuItem key={advertiser.id} value={advertiser.id}>
    //         {advertiser.name}
    //     </MenuItem>
    // ));

    return (
        <Box>
            <ThemeProvider theme={theme}>
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
                    <ListItem key="bureau">
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={store.agency.data?.name} />
                    </ListItem>
                    <ListItem key="email">
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={store.session.user?.email} />
                    </ListItem>
                </List>
                <Divider />
                <ListItem disablePadding key="logout">
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={appText.logout()} />
                    </ListItemButton>
                </ListItem>
                <List>
                    {/* {store.advertiser.favorites && (
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
                                        {advertisers};
                                    </Select>
                                </FormControl>
                            </Box>
                        </ListItem>
                    )} */}
                </List>
            </ThemeProvider>
        </Box>
    );
};

export default observer(SessionMenu);
