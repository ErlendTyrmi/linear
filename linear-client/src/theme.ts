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

export default theme;
