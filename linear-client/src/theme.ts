import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { palette } from '@mui/system';

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
        fontFamily: 'Ubuntu, sans-serif',
        button: {
            textTransform: 'none',
            fontSize: 'inherit'
        },
        h1: {
            fontWeight: '800',
            fontSize: '2.5em',
            paddingTop: 24,
            paddingBottom: 8
        },
        h2: {
            fontWeight: '800',
            fontSize: '1.6em',
            paddingTop: 24,
            paddingBottom: 8
        },
        h3: {
            fontWeight: '800',
            fontSize: '1.3em'
        },
        subtitle1: {
            fontSize: '12px',
            color: 'primary'
        }
    }
});

export const customColors = {
    whiteSemiTrans: 'rgba(255, 255, 255, 0.6)'
};

export default theme;
