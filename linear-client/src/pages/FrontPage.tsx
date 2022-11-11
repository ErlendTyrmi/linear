import { Box, Button, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Order } from '../entities/order';
import store from '../stores/store';
import Image from '../assets/images/england.jpg';
import { customColors } from '../theme';
import { appText } from '../appText';

const FrontPage = () => {
    console.log("front page reloadin'");

    useEffect(() => {
        if (store.session.user === null) {
            store.session.loadUser();
        }
        store.order.loadOrders();
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
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexDirection: 'row-reverse',
                    paddingTop: { xs: '100px', sm: '200px' },
                    display: 'flex'
                }}
            >
                <Box sx={{ padding: 2, maxWidth: 420, backgroundColor: customColors.whiteSemiTrans }}>
                    {/* backgroundColor: customColors.whiteSemiTrans, */}
                    <Typography variant="h2">Vigtige tidsbestemte beskeder</Typography>
                    <Typography>Kæmpe mega kampagneudsalg! Elkrise-rabat på det hele.</Typography>
                    <Button variant="contained">Køb mere nu</Button>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ padding: 2 }}>
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
                    <Typography>{store.order.getOrdersForCurrentAdvertiser()?.length} ordre.</Typography>
                    <Typography>{store.order.getOrdersOverBudget()?.length} er over budget.</Typography>
                    <Divider />
                    <Typography variant="h3">Alle dine ordre</Typography>
                    <Typography>{store.order.getOrdersForAllFavoriteAdvertisers()?.length} ordre.</Typography>
                    <Typography>{store.order.getOrdersOverBudgetForAllSelected()?.length} er over budget.</Typography>
                    <Divider />
                    <Button>Se mere</Button>
                </Grid>
            </Grid>
        </div>
    );
};
export default observer(FrontPage);
