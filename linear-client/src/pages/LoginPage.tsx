import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { linearAPI } from '../network/api';

export const LoginPage = () => {
    const navigate = useNavigate();

    const login = () => {
        linearAPI.get('/session/login').then((response) => {
            if (response.status !== 200) return;
            console.log('Logged in');
            navigate('/dashboard');
        });
    };

    return (
        <menu>
            <h1>This is the login page</h1>
            <Button
                onClickCapture={() => {
                    console.log('login');
                    login();
                }}
            >
                Login
            </Button>
        </menu>
    );
};
