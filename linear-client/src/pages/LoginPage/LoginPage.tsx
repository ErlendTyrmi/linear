import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';
import LoginForm from './LoginForm';
import Image from '../../assets/images/mountain.jpg';

const LoginPage = () => {
    // Logo and layout here :-)

    return (
        <Box sx={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover' }}>
            <CssBaseline />
            <Grid container direction="row" justifyContent="center" alignItems="center" height="100vh">
                <Box sx={{ maxWidth: 500 }}>
                    <img alt="logo" src={require('../../assets/images/tv_x_logo_inline_opaque.png')} width="100%" />
                    <LoginForm />
                </Box>
            </Grid>
        </Box>
    );
};

export default observer(LoginPage);
