import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import { appText } from '../appText';
import store from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';
import { Advertiser } from '../entities/advertiser';

interface Props {
    setMenuOpen: any;
    setSessionMenuOpen: any;
    drawerWidth: number;
}

const TopMenu = (props: Props) => {
    const setMenuOpen = props.setMenuOpen;
    const setSessionMenuOpen = props.setSessionMenuOpen;
    const drawerWidth = props.drawerWidth;
    //const navigate = useNavigate();

    const advertisers = (store.advertiser.advertisers as Advertiser[])?.map((advertiser: Advertiser) => <MenuItem value={advertiser.id}>{advertiser.name}</MenuItem>);

    return (
        <AppBar
            elevation={0}
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => setMenuOpen(true)} sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: '1' }}>
                    TVX linear
                </Typography>
                {store.advertiser.advertisers && (
                    <Box sx={{ width: '300px', color: 'inherit', display: { xs: 'none', sm: 'block' } }}>
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
                )}
                <Button color="inherit" onClick={() => setSessionMenuOpen(true)} endIcon={<PersonIcon />}>
                    {store.session.user?.userName ?? appText.noUserName()}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default observer(TopMenu);
