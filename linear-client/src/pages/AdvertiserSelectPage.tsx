import { Box, Button, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../appText';
import { Advertiser } from '../entities/advertiser';
import { Order } from '../entities/order';
import store from '../stores/store';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const AdvertiserSelectPage = () => {
    console.log("AdvertiserSelectPage reloadin'");

    useEffect(() => {
        if (store.session.user === null) store.session.loadUser();
        if (store.advertiser.favorites.length < 1) store.advertiser.loadFavorites();
        if (store.advertiser.advertisers.length < 1) store.advertiser.loadAdvertisers();
    }, []);

    const addFav = (advertiser: Advertiser) => {
        store.advertiser.addFavoriteAndUpload(advertiser);
        console.log('added' + advertiser.name);
    };

    const removeFav = (advertiser: Advertiser) => {
        store.advertiser.removeFavoriteAndUpload(advertiser);
        console.log('removed' + advertiser.name);
    };

    const items = (store.advertiser.advertisers as Advertiser[])?.map((advertiser: Advertiser) => (
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
        <Box sx={{ padding: 2 }}>
            <Typography variant="h2">{appText.advertiserSelect()}</Typography>
            <Typography>{appText.advertiserSelectExplainer()}</Typography>
            {store.advertiser.advertisers.length > 0 && <List>{items}</List>}
        </Box>
    );
};

export default observer(AdvertiserSelectPage);
