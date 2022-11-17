import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../assets/text';
import { Advertiser } from '../entities/advertiser';
import { Order } from '../entities/order';
import store from '../stores/store';
import WarningIcon from '@mui/icons-material/WarningAmber';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Navigate, useNavigate } from 'react-router-dom';
import { OrderFilter } from '../utility/orderEnums';

interface Props {
    open: boolean;
    setOpen: any;
}

const OverBudgetModal = (props: Props) => {
    const navigate = useNavigate();
    const open = props.open;
    const setOpen = props.setOpen;
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        if (store.advertiser.favorites.length < 1) store.advertiser.loadFavorites();
        if (store.order.data.length < 1) store.order.loadOrders();
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilterText(event.target.value);
    };

    const handleClick = (advertiser: Advertiser) => {
        store.advertiser.setSelected(advertiser.id);
        store.order.setPresetFilters([OrderFilter.overBudget, OrderFilter.selectedAdvertiser]);
        navigate('/order');
        setOpen(false);
        store.ui.setMobileMenuOpen(false);
    };

    const items = store.advertiser.favorites
        .filter((it) => {
            return filterText === '' || it.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
        })
        .map((advertiser: Advertiser) => (
            <ListItem key={advertiser.id} disablePadding>
                <ListItemButton onClick={() => handleClick(advertiser)}>
                    <ListItemIcon>
                        <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText>{`${advertiser.name} - ${
                        store.order.getOrdersWithFiltersAndAdvertiser([OrderFilter.overBudget], advertiser.id).length
                    } ${appText.orderOverBudgetListItemAdvertiserText()}`}</ListItemText>
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
                <Button onClickCapture={() => setOpen(false)}>{appText.actionsClose()}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(OverBudgetModal);
