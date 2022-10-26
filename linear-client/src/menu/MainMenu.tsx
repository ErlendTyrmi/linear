import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Toolbar>
                <Button
                    variant="contained"
                    onClickCapture={() => {
                        navigate('/');
                    }}
                >
                    <img src={require('../images/logo.png')} height="40" />
                </Button>
            </Toolbar>
            <Divider />
            <List>
                {['/', 'Other'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClickCapture={() => navigate(text)}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );
};
