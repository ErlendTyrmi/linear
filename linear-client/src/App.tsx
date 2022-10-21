import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMenu from './menu/MainMenu';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import store from './stores/store';

const Application = () => {
    return (
        <div>
            <BrowserRouter>
                <MainMenu />

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <FrontPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Application;
