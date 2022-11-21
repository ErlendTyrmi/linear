import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box, Button, Divider } from '@mui/material';
import store from '../stores/store';
import { Advertiser } from '../entities/advertiser';
import { appText } from '../assets/appText';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import AdvertiserSelectModal from './AdvertiserSelectModal';

const AdvertiserSelectMenu = () => {
    const favorites: Advertiser[] = store.advertiser.favorites;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const selectorWidth = { big: '300px', small: '270px', tiny: '150px' };
    const open = Boolean(anchorEl);
    const [editDialogOpen, SetEditDialogOpen] = useState(false);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
        store.advertiser.setSelected(index);
        setAnchorEl(null);
    };

    const handleEditButton = () => {
        SetEditDialogOpen(true);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                disabled={store.advertiser.isLoading}
                color="inherit"
                id="advertiser-button"
                aria-haspopup="listbox"
                aria-controls="advertiser-menu"
                aria-label="personification of an advertiser"
                aria-expanded={open ? 'true' : 'false'}
                onClick={handleClickListItem}
            >
                {store.advertiser.getAdvertiser(store.advertiser.selected)?.name ?? `${appText.advertiserMissing()} (${appText.add()})`}
            </Button>
            <Menu
                id="advertiser-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox'
                }}
            >
                {favorites.length > 0 ? (
                    favorites.map((favoriteAdvertiser: Advertiser) => (
                        <MenuItem
                            key={favoriteAdvertiser.id}
                            selected={favoriteAdvertiser.agencyId === store.advertiser.selected}
                            onClick={(event) => handleMenuItemClick(event, favoriteAdvertiser.id)}
                            sx={{ width: { md: selectorWidth.big } }}
                        >
                            {favoriteAdvertiser.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem key="no-data">{appText.advertiserMissing()}</MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleEditButton}>
                    <EditIcon></EditIcon>
                    {appText.edit()}
                </MenuItem>
            </Menu>

            <AdvertiserSelectModal open={editDialogOpen} setOpen={SetEditDialogOpen.bind(this)} />
        </Box>
    );
};

export default observer(AdvertiserSelectMenu);
