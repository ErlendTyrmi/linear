import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../stores/store';

// Redirect to login.
const ProtectedRoute: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    const navigate = useNavigate();
    const active = store.session.active;

    useEffect(() => {
        if (store.session.active === false || store.session.active === undefined) {
            navigate('/login', { replace: true });
        }
    }, [navigate, active]);

    return store.session.active === false || store.session.active === undefined ? null : children;
};

export default observer(ProtectedRoute);
