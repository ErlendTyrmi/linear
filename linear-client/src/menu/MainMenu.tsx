import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

interface Props {
    setOpen: any;
}

export const MainMenu = (props: Props) => {
    const navigate = useNavigate();
    const close = () => props.setOpen(false);

    return (
        <div>
            <Toolbar>
                <Button
                    variant="contained"
                    onClickCapture={() => {
                        close();
                        navigate('/');
                    }}
                >
                    <img src={require('../images/logo.png')} height="40" />
                </Button>
            </Toolbar>
            <Divider />
            <List>
                {['/', '/Other', '/third', '/fourth', '/fifth'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClickCapture={() => {
                                close();
                                navigate(text);
                            }}
                        >
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
