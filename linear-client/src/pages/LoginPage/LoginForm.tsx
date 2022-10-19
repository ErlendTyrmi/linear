import { Button, Card, CardActions, CardContent, CardHeader, createStyles, makeStyles, TextField, Theme } from '@mui/material';
import { runInAction } from 'mobx';
import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';

type State = {
    username: string;
    password: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action =
    | { type: 'setUsername'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'loginSuccess'; payload: string }
    | { type: 'loginFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
};

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.username, state.password]);

    const handleLogin = () => {
        store.clear();

        store.session.login(state.username, state.password).then((response) => {
            let status = response.status as number;
            if (status === 401) {
                // Login failed
                dispatch({
                    type: 'loginFailed',
                    payload: 'Wrong username or password'
                });
            } else if (status === 200) {
                runInAction(() => {
                    store.session.setUser(response.data);
                });
                console.log(store.session.user?.name + ' logged in.');
                navigate('/', { replace: true });
            } else {
                // Other error
                dispatch({
                    type: 'loginFailed',
                    payload: 'Something went wrong'
                });
            }
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };
    return (
        <form noValidate autoComplete="off">
            <Card>
                <CardHeader title="Login" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="large" color="secondary" onClick={handleLogin} disabled={state.isButtonDisabled}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default Login;
