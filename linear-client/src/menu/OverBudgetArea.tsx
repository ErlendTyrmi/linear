import { ListItem, Typography, Box, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import WarningIcon from '@mui/icons-material/WarningAmber';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import store from '../stores/store';
import { appText } from '../assets/text';
import OverBudgetModal from './OverBudgetModal';
import { useState } from 'react';
import { OrderCategory } from '../utility/orderEnums';

const OverBudgetArea = () => {
    const [modalOpen, setModalOpen] = useState(false);
    let warningsAmount = store.order.getOrdersWithFiltersAndSearch([OrderCategory.allFavorites, OrderCategory.overBudget], null).length;

    const handleClick = () => {
        setModalOpen(true);
    };

    return (
        <ListItem key="booking-status">
            <Box key="manu-warnings">
                {warningsAmount > 0 ? (
                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
                            <WarningIcon color="warning" sx={{ paddingRight: 1, fontSize: 47 }} />
                            <Box>
                                <Typography variant="h3">{appText.ordersOverBudgetHeader()}</Typography>
                                <Typography variant="body2">
                                    {warningsAmount} {appText.ordersOverBudgetSummary()}
                                </Typography>
                            </Box>
                        </Box>

                        <Button size="small" onClick={handleClick} sx={{ paddingLeft: 0 }}>
                            {appText.orderShowOverBudget()}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Box sx={{ display: 'flex', flexDirection: 'horizontal' }}>
                            <SuccessIcon color="success" sx={{ paddingRight: 1, fontSize: 47 }} />
                            <Box>
                                <Typography variant="h3">{appText.ordersOverBudgetHeader()}</Typography>
                                <Typography variant="body2">{appText.ordersOverBudgetSummaryWhenZero()}</Typography>
                            </Box>
                        </Box>
                    </div>
                )}
            </Box>
            <OverBudgetModal open={modalOpen} setOpen={setModalOpen} />
        </ListItem>
    );
};

export default observer(OverBudgetArea);
