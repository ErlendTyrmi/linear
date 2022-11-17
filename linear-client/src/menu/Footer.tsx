import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { menuItems } from '../App';
import { appText } from '../assets/text';
import theme from '../theme';

export const Footer = () => {
    const navigate = useNavigate();
    const items = menuItems;

    return (
        <Box sx={{ marginTop: 6, padding: 4, color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main }}>
            <Grid container spacing={{ xs: 1, sm: 4 }}>
                <Grid item xs={12} sm={4}>
                    <img alt="banner-image" src={require('../assets/images/tv_x_logo_inline_opaque.png')} height="24px" />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h3">{appText.footerNavigationHeader()}</Typography>
                    <Divider color={theme.palette.primary.contrastText} sx={{ marginTop: 2, marginBottom: 1 }} />
                    <List>
                        {items.map((item) => (
                            <ListItem key={item.name ?? item} disablePadding>
                                <ListItemButton
                                    onClickCapture={() => {
                                        navigate(item.url);
                                    }}
                                >
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h3">{appText.footerContactHeader()}</Typography>
                    <Divider color={theme.palette.primary.contrastText} sx={{ marginTop: 2, marginBottom: 2 }} />
                    {appText.footerContactAddress().map((it) => (
                        <Typography key={it}>{it}</Typography>
                    ))}
                    <Link href={`mailto:${appText.footerContactMail()}`} color="inherit">
                        {appText.footerContactMail()}
                    </Link>
                </Grid>

                <Grid item xs={12} sm={12} md={12} sx={{ textAlign: 'center', paddingTop: 4 }}>
                    <Typography variant="subtitle2">{appText.footerCopyright()}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
