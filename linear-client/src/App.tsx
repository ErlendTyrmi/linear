import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMenu from './menu/MainMenu';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

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
