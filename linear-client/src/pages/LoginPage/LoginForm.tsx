import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../appText';
import rootStore from '../../stores/store';

const LoginForm = () => {
    const sessionStore = rootStore.sessionStore;
    const statusStore = rootStore.statusStore;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        statusStore.clear();
        sessionStore.clear();
        statusStore.setLoading(true);

        sessionStore
            .login(username, password)
            .then((response) => {
                let status = response.status as number;

                if (status === 200) {
                    runInAction(() => {
                        sessionStore.setUser(response.data);
                    });
                    navigate('/', { replace: true });
                } else {
                    // Unknown error
                    statusStore.setError(appText.error['da']);
                }

                statusStore.setLoading(false);
            })
            .catch((error: AxiosError) => {
                if (error.code === AxiosError.ERR_BAD_REQUEST) {
                    statusStore.setError(appText.errorLogin['da']);
                } else if (error.code === AxiosError.ERR_NETWORK) {
                    statusStore.setError(appText.errorNetwork['da']);
                } else {
                    statusStore.setError(appText.error['da']);
                }

                statusStore.setLoading(false);
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
                        {statusStore.loading === true && <CircularProgress />}
                        <TextField
                            error={statusStore.lastError != null || isInvalid(username)}
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
                            error={statusStore.lastError != null || isInvalid(password)}
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
                    <Typography>{statusStore.errors.length} errors</Typography>
                    {statusStore.errors && statusStore.errors.map((data: string) => <Typography>{data}</Typography>)}
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={statusStore.loading === true}>
                        Login
                    </Button>
                </CardActions>
            </Card>
            <Button onClick={() => statusStore.setLoading(!statusStore.loading)}>HEY</Button>
        </form>
    );
};

export default observer(LoginForm);

function isInvalid(credential: string): boolean | undefined {
    return credential === '';
}
