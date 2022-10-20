import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { Route, useNavigate } from 'react-router-dom';
import rootStore from './stores/store';

// Redirect to login.
const ProtectedRoute: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    const navigate = useNavigate();

    if (rootStore.sessionStore.user === undefined) {
        navigate('/login', { replace: true });
    }

    return children;
};

export default observer(ProtectedRoute);
