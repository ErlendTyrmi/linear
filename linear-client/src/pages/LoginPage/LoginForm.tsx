import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appText } from '../../appText';
import store from '../../stores/store';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        store.message.clear();
        store.session.clear();

        store.session.login(username, password).then((response) => {
            // let status = response.status as number;

            // if (status === 200) {
            //     runInAction(() => {
            store.session.setUser(response.data);
            //     });
            //     navigate('/', { replace: true });
            // } else {
            //     // Unknown error
            //     store.message.setError(appText.error['da']);
            // }

            store.session.setLoading(false);
        });
        // .catch((error: AxiosError) => {
        //     if (error.code === AxiosError.ERR_BAD_REQUEST) {
        //         store.message.setError(appText.errorLogin['da']);
        //     } else if (error.code === AxiosError.ERR_NETWORK) {
        //         store.message.setError(appText.errorNetwork['da']);
        //     } else {
        //         store.message.setError(appText.error['da']);
        //     }

        //     store.session.setLoading(false);
        // });
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
        <form noValidate autoComplete="off">
            <Card>
                <CardHeader title={appText.login['da']} />
                <CardContent>
                    <div>
                        {store.session.loading === true && <CircularProgress />}
                        <TextField
                            error={store.message.lastError != null || isInvalid(username)}
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
                            error={store.message.lastError != null || isInvalid(password)}
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
                    <Typography>{store.message.errors.length} errors</Typography>
                    {store.message.errors && store.message.errors.map((data: string) => <Typography>{data}</Typography>)}
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={store.session.loading === true}>
                        Login
                    </Button>
                </CardActions>
            </Card>
            <Button onClick={() => store.session.setLoading(!store.session.loading)}>HEY</Button>
        </form>
    );
};

export default observer(LoginForm);

function isInvalid(credential: string): boolean | undefined {
    return credential === '';
}
