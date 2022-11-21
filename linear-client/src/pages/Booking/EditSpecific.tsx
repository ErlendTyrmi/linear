import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { appText } from '../../assets/appText';
import { SpotBooking } from '../../entities/spotBooking';

import store from '../../stores/store';
import { DateFormatter } from '../../utility/DateFormatter';

const EditSpecificSpots = () => {
    useEffect(() => {
        if (store.order.isLoading === false) store.order.loadOrders();
        if (store.spot.isLoading === false)
            store.spot.loadSpots().then(() => {
                if (store.spotBooking.isLoading === false) store.spotBooking.loadSpotBookings();
            });
    }, []);

    // TODO: Grab Spotbooking and keep it here

    return (
        <div>
            <Typography variant="h2">{appText.bookingSpotBookingHeader()}</Typography>
            {store.spotBooking.getSpotBookingsForCurrentOrder().map((booking: SpotBooking) => (
                <Box key={booking.id}>
                    <Divider />
                    <Typography>{DateFormatter.prettyDateWithTime(store.spot.getBySpotId(booking.spotId)?.startDateTime)}</Typography>
                    <Typography>Sender inden {store.spot.getBySpotId(booking.spotId)?.nextProgram}</Typography>
                    <Typography>
                        Booket: {store.spot.getBySpotId(booking.spotId)?.bookedSeconds} af {store.spot.getBySpotId(booking.spotId)?.duration} sekunder
                    </Typography>
                    <Typography>pris: {store.spot.getBySpotId(booking.spotId)?.priceTotal.toString()}</Typography>
                    <Button
                        disabled={store.spotBooking.isLoading || store.booking.currentOrderId === null}
                        onClick={() => {
                            let order = store.booking.currentOrderId;
                            if (order !== null) {
                                store.spotBooking.delete(booking);
                            }
                        }}
                        color="error"
                    >
                        {appText.bookingActionsDeleteSpotBooking()}
                    </Button>
                </Box>
            ))}
        </div>
    );
};
export default observer(EditSpecificSpots);
