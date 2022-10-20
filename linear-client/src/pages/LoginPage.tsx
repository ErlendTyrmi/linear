import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';

const LoginPage = () => {
    const navigate = useNavigate();

    const login = () => {
        store.clear();

        store.session.login().then((response) => {
            let status = response.status as number;
            if (status === 401) {
                // Login failed
                console.log('401 - Login failed.');
            } else if (status === 200) {
                runInAction(() => {
                    store.session.setUser(response.data);
                });
                console.log(store.session.user?.name + ' logged in.');
                navigate('/', { replace: true });
            } else {
                // Other error
                console.log('Non-login fail.');
            }
        });
    };

    return (
        <Typography>
            <h1>This is the login page</h1>
            <Button
                onClickCapture={() => {
                    console.log('login');
                    login();
                }}
            >
                Login
            </Button>
        </Typography>
    );
};

export default observer(LoginPage);
