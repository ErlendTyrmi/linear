import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../stores/store';
import LoginForm from './LoginForm';

const LoginPage = () => {
    // Logo and layout here :-)

    return <LoginForm />;
};

export default observer(LoginPage);
