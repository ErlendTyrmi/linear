import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';
import LoginForm from './LoginForm';
import Image from '../../assets/images/screen.png';
import theme from '../../theme';

const LoginPage = () => {
    // Logo and layout here :-)

    return (
        <Box
            sx={{
                backgroundColor: 'black',
                backgroundImage: `url(${Image})`,
                backgroundSize: '80%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom left',
                zIndex: 1201,
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <CssBaseline />
            <Grid container direction="row" justifyContent="center" alignItems="center" height="100vh" width="100vw">
                <Box sx={{ maxWidth: 500 }}>
                    <img alt="logo" src={require('../../assets/images/tv_x_logo_inline_opaque.png')} width="100%" />
                    <LoginForm />
                </Box>
            </Grid>
        </Box>
    );
};

export default observer(LoginPage);
