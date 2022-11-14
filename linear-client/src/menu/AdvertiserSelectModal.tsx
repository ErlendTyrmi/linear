import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../appText';
import { Advertiser } from '../entities/advertiser';
import { Order } from '../entities/order';
import store from '../stores/store';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface Props {
    open: boolean;
    setOpen: any;
}

const AdvertiserSelectModal = (props: Props) => {
    const open = props.open;
    const setOpen = props.setOpen;
    const [filterText, setFilterText] = useState('');
    const [advertisers, setAdvertisers] = useState(store.advertiser.data);

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
        setFilterText(event.target.value);
    };

    const items = advertisers
        .filter((it) => {
            return filterText === '' || it.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
        })
        .map((advertiser: Advertiser) => (
            <ListItem key={advertiser.id}>
                {store.advertiser.getFavoriteIds().includes(advertiser.id) ? (
                    <ListItemButton onClick={() => removeFav(advertiser)} disabled={store.advertiser.loading}>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText>{advertiser.name}</ListItemText>
                    </ListItemButton>
                ) : (
                    <ListItemButton color="secondary" onClick={() => addFav(advertiser)} disabled={store.advertiser.loading}>
                        <ListItemIcon>
                            <StarBorderIcon />
                        </ListItemIcon>
                        <ListItemText>{advertiser.name}</ListItemText>
                    </ListItemButton>
                )}
            </ListItem>
        ));

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle variant="h2">{appText.advertiserSelect()}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'inherit' }}>{appText.advertiserSelectExplainer()}</DialogContentText>
                <TextField autoFocus margin="dense" id="filter" label={appText.filter()} type="email" fullWidth variant="standard" value={filterText} onChange={handleFilterChange} />
                {store.advertiser.data.length > 0 ? <List>{items}</List> : <CircularProgress color="inherit" />}
            </DialogContent>
            <DialogActions>
                <Button onClickCapture={() => setOpen(false)}>{appText.close()}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(AdvertiserSelectModal);
