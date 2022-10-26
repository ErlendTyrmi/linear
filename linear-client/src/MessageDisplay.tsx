import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Alert, Box, Button, Snackbar, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from './stores/store';

// Show Snackbars (errors and warnings)
const MessageDisplay: React.FC<{ children: ReactJSXElement }> = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            {children}

            <Snackbar open={store.message.errors.length > 0} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {(store.message.errors as string[])?.map((error: string) => (
                        <div key={error}>{error}</div>
                    ))}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
        </div>
    );
};

export function CustomizedSnackbars() {}

export default observer(MessageDisplay);
