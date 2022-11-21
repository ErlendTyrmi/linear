import { Box, Button, Divider, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/appText';
import store from '../../stores/store';
import BookingEdit from './BookingEdit';

const BookingPage = () => {
    useEffect(() => {
        if (store.session.user === null && store.session.isLoading === false) store.session.loadUser();
    }, []);

    const navigate = useNavigate();
    const bookNewOrderView = (
        <Box>
            <Typography variant="h1">{appText.bookingHeader()}</Typography>
            <Divider sx={{ marginBottom: 1 }} />
            <Typography sx={{ marginBottom: 1 }}>{appText.pageNotImplemented()}</Typography>
            <Button variant="contained" onClickCapture={() => navigate('/order')}>
                {appText.bookingSeeExisting()}
            </Button>
        </Box>
    );
    return (
        <div>
            {store.order.isLoading || store.spot.isLoading || (store.spotBooking.isLoading && <LinearProgress />)}

            <Box sx={{ marginRight: 3, marginLeft: 3 }}>{store.booking.isNewOrder ? bookNewOrderView : <BookingEdit />}</Box>
        </div>
    );
};
export default observer(BookingPage);
