import { Box, Button, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Order } from '../../entities/order';
import store from '../../stores/store';
import Image from '../../assets/images/superheroes-dark.jpg';
import NewsBg from '../../assets/images/news-bg.png';
import theme from '../../theme';
import { appText } from '../../assets/text';
import { useNavigate } from 'react-router-dom';
import NewsSegment from './NewsSegment';
import OrderSegment from './OrderSegment';
import StatusSegment from './StatusSegment';
import { OrderFilter } from '../../utility/orderEnums';

const FrontPage = () => {
    console.log('front page reloading');
    const navigate = useNavigate();

    useEffect(() => {
        if (store.session.user === null && store.session.loading === false) store.session.loadUser();

        if (store.agency.data === null && store.agency.loading === false) store.agency.loadAgency();

        if (store.advertiser.loading === false) {
            store.advertiser.loadFavorites();
            store.advertiser.loadAdvertisers();
        }

        if (store.order.loading === false) store.order.loadOrders();
    }, []);

    return (
        <div>
            <Box
                sx={{
                    minHeight: 200,
                    backgroundColor: theme.palette.primary.main,
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom right',
                    color: 'white'
                }}
            >
                <Box
                    sx={{
                        padding: { xs: 1, sm: 8 },
                        paddingTop: { xs: '60px', sm: '100px', md: '180px' },
                        flexDirection: 'row-reverse',
                        display: 'flex',
                        width: '100%',
                        fontSize: 'large',
                        backgroundImage: `url(${NewsBg})`,
                        backgroundPosition: 'bottom right',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <Box sx={{ maxWidth: '700px', textOverflow: 'wrap', minWidth: '200px' }}>
                        <Typography variant="h1">{appText.newsLatestHeader()}</Typography>
                        <Typography>{appText.newsLatest()}</Typography>
                        <Button
                            sx={{ marginTop: 1 }}
                            variant="outlined"
                            color="inherit"
                            onClickCapture={() => {
                                navigate('/booking');
                            }}
                        >
                            {appText.newsLatestButtonText()}
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={{ xs: 1, sm: 4 }} sx={{ paddingLeft: 4, paddingRight: 4 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <OrderSegment />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <NewsSegment />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatusSegment />
                </Grid>
            </Grid>
        </div>
    );
};
export default observer(FrontPage);
