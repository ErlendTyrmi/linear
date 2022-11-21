import { Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { padding } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../assets/appText';
import store from '../../stores/store';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        store.message.Clear();
        store.session.login(username, password).then(() => {
            if (store.session.user != null) {
                store.session.setActive(true);
                navigate('/');
            }
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && password.length > 0 && username.length > 0) {
            handleLogin();
        }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Paper sx={{ position: 'relative', padding: 2 }}>
            <Typography variant="h4">{appText.login()}</Typography>

            <form>
                <Backdrop sx={{ position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={store.session.isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TextField
                    id="username-input"
                    autoComplete="username"
                    label={appText.loginName()}
                    fullWidth
                    margin="normal"
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    error={store.message.errors.length > 0}
                />
                <TextField
                    id="password-input"
                    autoComplete="current-password"
                    label={appText.loginPassword()}
                    fullWidth
                    type="password"
                    margin="normal"
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    error={store.message.errors.length > 0}
                    helperText={store.message.lastError() ?? appText.error()}
                />
            </form>
            <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: '16px' }}
                fullWidth
                onClick={handleLogin}
                disabled={store.session.isLoading === true || username.length < 3 || password.length < 3}
            >
                Login
            </Button>
        </Paper>
    );
};

export default observer(LoginForm);
