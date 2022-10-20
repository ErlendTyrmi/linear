import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { runInAction } from 'mobx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../appText';
import store from '../../stores/store';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        store.status.setLoading(true);
        store.status.setLastError(null);
        store.clear();

        store.session
            .login(username, password)
            .then((response) => {
                console.log(response);
                store.status.setLoading(false);
                let status = response.status as number;

                if (status === 200) {
                    store.status.setLoading(false);
                    runInAction(() => {
                        store.session.setUser(response.data);
                    });
                    navigate('/', { replace: true });
                } else {
                    store.status.setLoading(false);
                    store.status.setLastError(appText.error['da']);
                }
            })
            .catch((error: AxiosError) => {
                store.status.setLoading(false);
                store.status.setLastError(appText.errorNetwork['da']);
            });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key == 'Enter' && password.length > 0 && username.length > 0) {
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
        <form noValidate autoComplete="on">
            <Card>
                <CardHeader title={appText.login['da']} />
                <CardContent>
                    <div>
                        <TextField
                            error={store.status.lastError != null || isInvalid(username)}
                            fullWidth
                            id="username"
                            type="email"
                            label={appText.loginName['da']}
                            placeholder={appText.loginName['da']}

                            margin="normal"
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={store.status.lastError != null || isInvalid(password)}
                            fullWidth
                            id="password"
                            type="password"
                            label={appText.loginPassword['da']}
                            placeholder={appText.loginPassword['da']}
                            margin="normal"
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <Typography>Error? {store.status.lastError}</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={store.status.loading === true}>
                        Login
                    </Button>
                </CardActions>
            </Card>
            {store.status.loading == true && <CircularProgress />}
        </form>
    );
};

export default Login;

function isInvalid(credential: string): boolean | undefined {
    return credential === '';
}
