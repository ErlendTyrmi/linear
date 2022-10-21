import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from './stores/store';

// Redirect to login.
const ProtectedRoute: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (store.session.user === null || store.session.user === undefined) navigate('/login', { replace: true });
    }, [navigate, store.session.user]);

    return store.session.user === null || store.session.user === undefined ? null : children;
};

export default observer(ProtectedRoute);
