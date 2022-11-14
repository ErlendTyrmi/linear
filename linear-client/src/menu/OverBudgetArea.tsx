import { List, ListItem, Divider, ListItemText, Typography, Box, Paper, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import WarningIcon from '@mui/icons-material/WarningAmber';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import store from '../stores/store';
import { appText } from '../appText';
import OverBudgetModal from './OverBudgetModal';
import { useState } from 'react';

const OverBudgetArea = () => {
    const order = store.order;
    const [modalOpen, setModalOpen] = useState(false);
    let ordersAmount = store.order.getOrdersForAllFavoriteAdvertisers().length;
    let warningsAmount = store.order.getOrdersOverBudgetForAllSelected().length;

    const handleClick = () => {
        setModalOpen(true);
    };

    return (
        <ListItem key="booking-status">
            <Box key="manu-warnings">
                {warningsAmount > 0 ? (
                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
                            <WarningIcon color="warning" sx={{ paddingRight: 1 }} />
                            <Typography variant="h3">{appText.ordersOverBudgetHeader()}</Typography>
                        </Box>
                        <Typography>
                            {warningsAmount} {appText.ordersOverBudgetSummary()}
                        </Typography>
                        <Button size="small" onClick={handleClick} sx={{ paddingLeft: 0 }}>
                            {appText.orderShowOverBudget()}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
                            <SuccessIcon color="success" sx={{ paddingRight: 1 }} />
                            <Typography variant="h3">{appText.ordersOverBudgetHeader()}</Typography>
                        </Box>

                        <Typography>{appText.ordersOverBudgetSummaryWhenZero()}</Typography>
                    </div>
                )}
            </Box>
            <OverBudgetModal open={modalOpen} setOpen={setModalOpen} />
        </ListItem>
    );
};

export default observer(OverBudgetArea);
