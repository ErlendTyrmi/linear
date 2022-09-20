import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';

const LoginPage = () => {
    const navigate = useNavigate();
    const [dirty, setDirty] = useState(false);

    // Clear all stores on login
    useEffect(() => {
        if (dirty === false) {
            store.clear();
            setDirty(true);
        }
    });

    const login = () => {
        store.session.login().then((response) => {
            let status = response.status as number;

            if (status === 401) {
                // Login failed
            } else if (status === 200) {
                store.session.user = response.data;
                navigate('/', { replace: true });
            } else {
                // Other error
            }
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

export default observer(LoginPage);
