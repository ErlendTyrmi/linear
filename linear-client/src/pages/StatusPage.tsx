import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { appText } from '../assets/appText';
import { Order } from '../entities/order';
import OverBudgetArea from '../menu/OverBudgetArea';
import store from '../stores/store';
import StatusSegment from './FrontPage/StatusSegment';

const StatusPage = () => {
    useEffect(() => {
        if (store.session.user === null && store.session.isLoading === false) store.session.loadUser();
    }, []);

    return (
        <div>
            {store.order.isLoading && <LinearProgress />}
            <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Typography variant="h1">{appText.statusHeader()}</Typography>
                <Divider />
                <Typography>{appText.pageNotImplemented()}</Typography>
                <StatusSegment />
            </Box>
        </div>
    );
};
export default observer(StatusPage);
