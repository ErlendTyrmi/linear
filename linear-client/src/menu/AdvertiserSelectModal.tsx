import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../assets/appText';
import { Advertiser } from '../entities/advertiser';
import store from '../stores/store';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface Props {
    open: boolean;
    setOpen: any;
}

const AdvertiserSelectModal = (props: Props) => {
    const open = props.open;
    const setOpen = props.setOpen;
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (store.advertiser.favorites.length < 1) store.advertiser.loadFavorites();
        if (store.advertiser.data.length < 1) store.advertiser.loadAdvertisers();
    }, []);

    const addFav = (advertiser: Advertiser) => {
        store.advertiser.addFavoriteAndUpload(advertiser);
    };

    const removeFav = (advertiser: Advertiser) => {
        store.advertiser.removeFavoriteAndUpload(advertiser);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(event.target.value);
    };

    const favorites = store.advertiser.favorites
        .filter((it) => {
            return searchText === '' || it.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        })
        .map((advertiser: Advertiser) => (
            <ListItem key={advertiser.id}>
                <ListItemButton onClick={() => removeFav(advertiser)} disabled={store.advertiser.isLoading}>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText>{advertiser.name}</ListItemText>
                </ListItemButton>
            </ListItem>
        ));

    const nonFavorites = store.advertiser.data
        .filter((it) => {
            return store.advertiser.getFavoriteIds().includes(it.id) === false && (searchText === '' || it.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
        })
        .map((advertiser: Advertiser) => (
            <ListItem key={advertiser.id}>
                <ListItemButton color="secondary" onClick={() => addFav(advertiser)} disabled={store.advertiser.isLoading}>
                    <ListItemIcon>
                        <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText>{advertiser.name}</ListItemText>
                </ListItemButton>
            </ListItem>
        ));

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle variant="h2">{appText.advertiserSelect()}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'inherit' }}>{appText.advertiserSelectExplainer()}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="filter"
                    label={appText.filter()}
                    type="email"
                    fullWidth
                    variant="standard"
                    value={searchText}
                    onChange={handleFilterChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                sx={{ visibility: searchText.length > 0 ? 'visible' : 'hidden' }}
                                onClick={() => {
                                    setSearchText('');
                                }}
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    }}
                />
                {favorites.length < 1 && nonFavorites.length < 1 && <CircularProgress color="inherit" />}
                {favorites.length > 0 && <List>{favorites}</List>}
                {favorites.length > 0 && nonFavorites.length > 0 && <Divider />}
                {nonFavorites.length > 0 && <List>{nonFavorites}</List>}
            </DialogContent>
            <DialogActions>
                <Button onClickCapture={() => setOpen(false)}>{appText.actionsClose()}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(AdvertiserSelectModal);
