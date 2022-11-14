import { Box, Button, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Order } from '../entities/order';
import store from '../stores/store';
import Image from '../assets/images/screen.png';
import theme, { customColors } from '../theme';
import { appText } from '../appText';

const FrontPage = () => {
    console.log('front page reloading');

    useEffect(() => {
        if (store.session.user === null && store.session.loading === false) store.session.loadUser();

        if (store.agency.data === null && store.agency.loading === false) store.agency.loadAgency();

        if (store.advertiser.loading === false) {
            store.advertiser.loadFavorites();
            store.advertiser.loadAdvertisers();
        }

        if (store.order.loading === false) store.order.loadOrders();
    }, []);

    const items = store.order.getOrdersForCurrentAdvertiser()?.map((order: Order) => (
        <Box key={order.id}>
            <Typography>{order.advertiserProductName}</Typography>
            Vises fra uge {order.startWeek} til uge {order.endWeek}
            <ul>
                <li>Annoncør: {order.advertiserName}</li>
                <li>Dette er en {order.salesProductName}-ordre.</li>
                <li>Budget: {order.orderBudget}</li>
                <li>Status: {order.orderStatus}</li>
            </ul>
        </Box>
    ));

    return (
        <div>
            <Box
                sx={{
                    minHeight: 200,
                    backgroundColor: theme.palette.primary.main,
                    backgroundImage: `url(${Image})`,
                    backgroundSize: '40%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'bottom left',
                    color: 'white',
                    flexDirection: 'row-reverse',
                    paddingTop: { xs: '100px', sm: '200px' },
                    display: 'flex'
                }}
            >
                <Box sx={{ padding: 2, maxWidth: 420 }}>
                    {/* backgroundColor: customColors.whiteSemiTrans, */}
                    <Typography variant="h2">Vigtige tidsbestemte beskeder</Typography>
                    <Typography>Kæmpe kampagneudsalg! Rabat på det hele i januar.</Typography>
                    <Button variant="outlined" color="inherit">
                        Bestil kampagne{' '}
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ padding: 4 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <Box>
                        {store.order.loading && <LinearProgress />}
                        <Typography variant="h3">Ordre</Typography>
                        <Typography variant="subtitle1">{store.advertiser.getCurrentAdvertiser()?.name}</Typography>

                        <Divider />

                        {store.order.data ? <Box>{items}</Box> : appText.orderNoneFound()}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h3">Nyheder</Typography>
                    <Button>Se mere</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h3">Status</Typography>
                    <Typography variant="subtitle1">{store.advertiser.getCurrentAdvertiser()?.name}</Typography>
                    <Divider />
                    <Typography>{store.order.getOrdersForCurrentAdvertiser()?.length} ordre.</Typography>
                    <Typography>{store.order.getOrdersOverBudget()?.length} er over budget.</Typography>
                    <Button>Se mere</Button>
                </Grid>
            </Grid>
        </div>
    );
};
export default observer(FrontPage);
