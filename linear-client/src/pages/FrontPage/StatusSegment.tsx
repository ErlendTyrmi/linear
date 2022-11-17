import { Box, Typography, Divider, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/text';
import { NewsArticle } from '../../entities/NewsArticle';
import { Cms_mock } from '../../network/textCms_mock';
import store from '../../stores/store';
import { OrderFilter } from '../../utility/orderEnums';

const StatusSegment = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (store.advertiser.loading === false && store.advertiser.getSelectedAdvertiser()) store.advertiser.loadFavorites();
        if (store.order.loading === false && store.order.getOrdersWithFiltersAndSearch([OrderFilter.selectedAdvertiser], null).length < 1) store.order.loadOrders();
    }, []);

    return (
        <div>
            <Typography variant="h2">{appText.menuStatus()}</Typography>
            <Divider />
            <Typography variant="subtitle1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                {store.advertiser.getSelectedAdvertiser()?.name ?? appText.advertiserMissing()}
            </Typography>

            <Typography>{store.order.getOrdersWithFiltersAndSearch([OrderFilter.selectedAdvertiser], null).length} ordre</Typography>
            <Typography>{store.order.getOrdersWithFiltersAndSearch([OrderFilter.selectedAdvertiser, OrderFilter.overBudget], null).length} er over budget</Typography>
            <Button
                size="small"
                sx={{ paddingLeft: 0 }}
                onClick={() => {
                    navigate('/status');
                }}
            >
                {appText.statusReadMore()}
            </Button>
        </div>
    );
};

export default observer(StatusSegment);
