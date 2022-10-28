import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
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
        store.message.Clear();
        store.session.login(username, password).then((response: AxiosResponse) => {
            console.log(response);
            store.session.setUser(response.data);
            if (store.session.user != null) {
                store.session.setActive(true);
                navigate('/');
            }
            store.session.setLoading(false);
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
        <form noValidate autoComplete="on">
            <Card sx={{ position: 'relative' }}>
                <Backdrop sx={{ position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={store.session.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CardHeader title={appText.login['da']} />
                <CardContent>
                    <div>
                        <TextField
                            error={isInvalid(username)}
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
                            error={isInvalid(password)}
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
                    <Typography>{store.message.warnings.length} errors</Typography>
                    {store.message.warnings && store.message.warnings.map((data: string) => <Typography>{data}</Typography>)}
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={store.session.loading === true}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default observer(LoginForm);

function isInvalid(credential: string): boolean | undefined {
    return credential === '';
}
