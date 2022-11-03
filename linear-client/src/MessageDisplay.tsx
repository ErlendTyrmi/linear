import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Alert, Box, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import store from './stores/store';

// Show Snackbars (errors and warnings)
const MessageDisplay: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    return (
        <Box>
            {children}

            <Snackbar open={store.message.successes?.length > 0} autoHideDuration={6000} onClose={() => {}}>
                <Alert
                    onClose={() => {
                        store.message.clearSuccess();
                    }}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {store.message.lastSuccess()}
                </Alert>
            </Snackbar>
            <Snackbar open={store.message.infos?.length > 0} autoHideDuration={6000} onClose={() => {}}>
                <Alert
                    onClose={() => {
                        store.message.clearInfo();
                    }}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    {store.message.lastInfo()}
                </Alert>
            </Snackbar>

            <Snackbar open={store.message.warnings?.length > 0} autoHideDuration={6000} onClose={() => {}}>
                <Alert
                    onClose={() => {
                        store.message.clearWarnings();
                    }}
                    severity="warning"
                    sx={{ width: '100%' }}
                >
                    {store.message.lastWarning()}
                </Alert>
            </Snackbar>

            <Snackbar open={store.message.errors?.length > 0} autoHideDuration={6000} onClose={() => {}}>
                <Alert
                    onClose={() => {
                        store.message.clearErrors();
                    }}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {store.message.lastError()}
                </Alert>
            </Snackbar>
        </Box>
    );
};

//export function CustomizedSnackbars() {}

export default observer(MessageDisplay);
