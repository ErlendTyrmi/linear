import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, List, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { appText } from '../../assets/appText';
import { SpotBooking } from '../../entities/spotBooking';

import store from '../../stores/store';
import { DateFormatter } from '../../utility/DateFormatter';

const EditSpecificSpots = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [markedBooking, setMarkedBooking] = useState<SpotBooking | null>(null);

    useEffect(() => {
        if (store.order.isLoading === false) store.order.loadOrders();
        if (store.spot.isLoading === false)
            store.spot.loadSpots().then(() => {
                if (store.spotBooking.isLoading === false) store.spotBooking.loadSpotBookings();
            });
    }, []);

    const handleDeleteBookingDialog = (booking: SpotBooking) => {
        setMarkedBooking(booking);
        setDeleteDialogOpen(true);
    };

    const handleDelete = (booking: SpotBooking) => {
        let order = store.booking.currentOrderId;
        if (order !== null) {
            store.spotBooking.delete(booking);
        }
    };

    const deleteDialog = () => {
        let booking = markedBooking;

        if (booking === null) return null;

        return (
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle variant="h2">Sikker?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'inherit', maxWidth: '800px' }}>
                        {appText.bookingDoYouWantToDelete()} "{store.spot.getBySpotId(booking.spotId)?.nextProgram}"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClickCapture={() => {
                            setDeleteDialogOpen(false);
                        }}
                    >
                        {appText.actionsCancel()}
                    </Button>
                    <Button
                        color="error"
                        onClickCapture={() => {
                            setDeleteDialogOpen(false);
                            if (markedBooking !== null) handleDelete(markedBooking);
                        }}
                    >
                        {appText.actionsOk()}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <div>
            {deleteDialog()}

            <Typography variant="h2">{appText.bookingSpotBookingHeader()}</Typography>
            {store.spotBooking.getSpotBookingsForCurrentOrder().map((booking: SpotBooking) => (
                <Box key={booking.id}>
                    <Divider />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: 1, paddingBottom: 1, columnGap: 10, rowGap: 1 }}>
                        <Box sx={{ flex: 1, minWidth: '220px' }}>
                            <Typography>{DateFormatter.prettyDateWithTime(store.spot.getBySpotId(booking.spotId)?.startDateTime)}</Typography>
                            <Typography>
                                {appText.bookingAirsBerforeProgram()} "{store.spot.getBySpotId(booking.spotId)?.nextProgram}"
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 2, minWidth: '220px' }}>
                            <Typography>
                                {store.spot.getBySpotId(booking.spotId)?.bookedSeconds} {appText.bookingBookedSecondsInSpot1()} {store.spot.getBySpotId(booking.spotId)?.duration}{' '}
                                {appText.bookingBookedSecondsInSpot2()}
                            </Typography>
                            <Typography>
                                {appText.bookingPriceLabel()} {store.spot.getBySpotId(booking.spotId)?.priceTotal.toString()}
                            </Typography>
                        </Box>

                        <Button
                            sx={{ height: 'fit-content' }}
                            variant="contained"
                            color="error"
                            disabled={store.spotBooking.isLoading || store.booking.currentOrderId === null}
                            onClick={() => {
                                handleDeleteBookingDialog(booking);
                            }}
                        >
                            {appText.bookingActionsDeleteSpotBooking()}
                        </Button>
                    </Box>
                </Box>
            ))}
        </div>
    );
};
export default observer(EditSpecificSpots);
