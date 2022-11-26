import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </CssBaseline>
    </ThemeProvider>
);

reportWebVitals();
