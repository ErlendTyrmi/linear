import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import SessionMenu from './SessionMenu';

const MainMenu = () => {
    const navigate = useNavigate();

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
};

export default observer(MainMenu);
