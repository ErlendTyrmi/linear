import { Box, Button, Divider, LinearProgress, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { appText } from '../../assets/appText';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import store from '../../stores/store';
import { useNavigate } from 'react-router-dom';
import { OrderFilter, OrderTypeName } from '../../utility/orderEnums';
import EditSpecificSpots from './EditSpecific';
import advertiserStore from '../../stores/advertiserStore';

const BookingEdit = () => {
    const navigate = useNavigate();

    if (advertiserStore.getSelectedAdvertiser() === undefined || advertiserStore.getSelectedAdvertiser()?.id !== store.booking.getCurrentOrder()?.advertiserId) {
        store.booking.clear();
    }

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                <Typography variant="h1" flex="1">
                    {appText.bookingEditHeader()}
                </Typography>
                <Button
                    sx={{ marginLeft: 1 }}
                    onClickCapture={() => {
                        store.booking.setIsNewOrder(true);
                        navigate('/booking');
                    }}
                >
                    <AddIcon />
                    {appText.bookingCreateNewButton()}
                </Button>
            </Box>

            <Divider />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {appText.orderItemAdvertiser()} : {store.booking.getCurrentOrder()?.advertiserName}
                </Typography>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {appText.orderItemAdvertiserProduct()} : {store.booking.getCurrentOrder()?.advertiserProductName}
                </Typography>

                <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {store.booking.getCurrentOrder()?.orderTypeName}
                    {appText.orderDashOrder()}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>
                    {store.booking.getCurrentOrder()?.channelName}
                </Typography>
                <Typography variant="body2">
                    {appText.orderItemBudget()} : {store.booking.getCurrentOrder()?.orderTotal} / {store.booking.getCurrentOrder()?.orderBudget}
                </Typography>
            </Box>

            {store.booking.getCurrentOrderBudgetDiff() > 0 && (
                <Typography sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {appText.bookingOrderIs()} {store.booking.getCurrentOrderBudgetDiff()} {appText.bookingDkkOverBudget()}
                </Typography>
            )}

            {store.booking.getCurrentOrder()?.orderTypeName === OrderTypeName.specific ? (
                <EditSpecificSpots />
            ) : (
                <Typography>
                    {store.booking.getCurrentOrder()?.advertiserProductName} {appText.orderIsExposureCannotEdit()}
                </Typography>
            )}
        </div>
    );
};
export default observer(BookingEdit);
