import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#009ceb'
        },
        secondary: {
            main: '#dcd4e4'
        },
        error: {
            main: red.A400
        }
    },
    shape: {
        borderRadius: 1
    },
    typography: {
        fontFamily: 'Ubuntu, sans-serif'
    }
});

// Headers
theme.typography.h1 = {
    fontWeight: '800',
    fontSize: '2em'
};
theme.typography.h2 = {
    fontWeight: '800',
    fontSize: '1.5em'
};
theme.typography.h3 = {
    fontWeight: '800',
    fontSize: '1.3em'
};

export const customColors = {
    whiteSemiTrans: 'rgba(255, 255, 255, 0.6)'
};

export default theme;
