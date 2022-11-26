import { Box, Divider, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { appText } from '../assets/appText';
import theme from '../theme';
import MainMenu from './MainMenu';

export const Footer = () => {

    return (
        <Box sx={{ marginTop: 6, padding: 3, color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main }}>
            <Grid container spacing={{ xs: 1, sm: 4 }}>
                <Grid item xs={12} sm={4}>
                    <img alt="tvx-logo" src={require('../assets/images/tv_x_logo_inline_opaque.png')} height="24px" />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="h3">{appText.footerNavigationHeader()}</Typography>
                    <Divider color={theme.palette.primary.contrastText} sx={{ marginTop: 2, marginBottom: 1 }} />

                    <MainMenu />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="h3">{appText.footerContactHeader()}</Typography>
                    <Divider color={theme.palette.primary.contrastText} sx={{ marginTop: 2, marginBottom: 2 }} />

                    {appText.footerContactAddress().map((it) => (
                        <Typography key={it}>{it}</Typography>
                    ))}
                    <Link href={`mailto:${appText.footerContactMail()}`} color="inherit">
                        {appText.footerContactMail()}
                    </Link>
                </Grid>

                <Grid item xs={12} sx={{ paddingTop: 4 }}>
                    <Typography variant="subtitle2">{appText.footerCopyright()}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
