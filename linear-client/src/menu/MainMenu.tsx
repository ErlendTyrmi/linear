import { useNavigate } from 'react-router-dom';
import { SessionMenu } from './SessionMenu';

export const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <menu>
            <button
                onClickCapture={() => {
                    navigate('/');
                }}
            >
                Home
            </button>
            <SessionMenu />
        </menu>
    );
};
