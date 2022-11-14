import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../appText';
import { Advertiser } from '../entities/advertiser';
import { Order } from '../entities/order';
import store from '../stores/store';
import WarningIcon from '@mui/icons-material/WarningAmber';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Navigate } from 'react-router-dom';

interface Props {
    open: boolean;
    setOpen: any;
}

const OverBudgetModal = (props: Props) => {
    const open = props.open;
    const setOpen = props.setOpen;
    const [filterText, setFilterText] = useState('');
    const [advertisers, setAdvertisers] = useState(store.advertiser.favorites);

    useEffect(() => {
        if (store.advertiser.favorites.length < 1) store.advertiser.loadFavorites();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilterText(event.target.value);
    };

    const handleClick = (advertiser: Advertiser) => {
        console.log(`${advertiser.name} was clicked`);
    };

    const items = advertisers
        .filter((it) => {
            return filterText === '' || it.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
        })
        .map((advertiser: Advertiser) => (
            <ListItem key={advertiser.id}>
                <ListItemButton onClick={() => handleClick(advertiser)}>
                    <ListItemIcon>
                        <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText>{`${advertiser.name} ${appText.orderOverBudgetListItemAdvertiserText()} 33000 ${appText.orderDKK()}`}</ListItemText>
                </ListItemButton>
            </ListItem>
        ));

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle variant="h2">{appText.orderOverBudgetModalHeader()}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'inherit', maxWidth: '800px' }}>{appText.orderOverBudgetModalExplainer()}</DialogContentText>
                <TextField autoFocus margin="dense" id="filter" label={appText.filter()} type="text" fullWidth variant="standard" value={filterText} onChange={handleFilterChange} />
                {store.advertiser.data.length > 0 ? <List>{items}</List> : <CircularProgress color="inherit" />}
            </DialogContent>
            <DialogActions>
                <Button onClickCapture={() => setOpen(false)}>{appText.close()}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(OverBudgetModal);
