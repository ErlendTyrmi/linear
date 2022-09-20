import { Button } from '@mui/material';
import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';
import SessionMenu from './SessionMenu';

const MainMenu = () => {
    const navigate = useNavigate();

    if (store.session.user !== undefined) {
        return (
            <menu>
                <Button
                    onClickCapture={() => {
                        navigate('/');
                    }}
                >
                    Home
                </Button>
                <SessionMenu />
            </menu>
        );
    }

    return null;
};

export default observer(MainMenu);
