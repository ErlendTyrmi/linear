import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { Route, useNavigate } from 'react-router-dom';
import store from './stores/store';

// Redirect to login.
const ProtectedRoute: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    const navigate = useNavigate();

    if (store.session.user === undefined) {
        store.session.loadUser().then((response) => {
            if (response.status === 200) {
                store.session.user = response.data;
            } else {
                store.clear();
                navigate('/login', { replace: true });
            }
        });
    }

    return children;
};

export default observer(ProtectedRoute);
