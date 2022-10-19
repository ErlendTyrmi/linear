import { Button, Card, CardActions, CardContent, CardHeader, createStyles, makeStyles, TextField, Theme } from '@mui/material';
import { runInAction } from 'mobx';
import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        store.clear();

        store.session.login(username, password).then((response) => {
            let status = response.status as number;
            if (status === 401) {
               
            } else if (status === 200) {
                runInAction(() => {
                    store.session.setUser(response.data);
                });
                console.log(store.session.user?.name + ' logged in.');
                navigate('/', { replace: true });
            } else {
               // Handle other error
            }
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key == "Enter" && password.length > 0 && username.length > 0) {
            handleLogin();
        }
    };

    return (
        <form noValidate autoComplete="on">
            <Card>
                <CardHeader title="Login" />
                <CardContent>
                    <div>
                        <TextField
                            //error={state.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            //onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                           // error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            // helperText={state.helperText}
                            // onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={username.length < 1 && password.length < 1}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default Login;
