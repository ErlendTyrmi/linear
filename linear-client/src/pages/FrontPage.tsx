import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';

const FrontPage = () => {
    const navigate = useNavigate();
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        if (dirty === false || store.test.data === '') {
            store.test.getTest();

            if (store.session.getUser() === null) {
                navigate('/login');
            }
        }
        setDirty(true);
    }, []);

    return (
        <Typography>
            <h1>This is the content</h1>
            <p>{store.test.data}</p>
            <p>{store.session.user?.name}</p>
        </Typography>
    );
};

export default observer(FrontPage);
