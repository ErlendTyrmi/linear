import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { appText } from '../assets/text';
import { Order } from '../entities/order';
import store from '../stores/store';

const StatusPage = () => {
    useEffect(() => {}, []);

    return (
        <div>
            {store.order.loading && <LinearProgress />}
            <Box sx={{ marginRight: 3, marginLeft: 3 }}>
                <Typography variant="h1">{appText.statusHeader()}</Typography>
                <Divider />
                <Typography>{appText.pageNotImplemented()}</Typography>
            </Box>
        </div>
    );
};
export default observer(StatusPage);
