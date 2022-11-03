import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';
import LoginForm from './LoginForm';

const LoginPage = () => {
    // Logo and layout here :-)

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Box sx={{ maxWidth: 500 }}>
                <LoginForm />;
            </Box>
        </Grid>
    );
};

export default observer(LoginPage);
