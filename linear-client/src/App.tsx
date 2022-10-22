import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './menu/DrawerLayout';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const Application = () => {
    return (
        <div>
            <BrowserRouter>
                {/* <MainMenu /> */}
                <DrawerLayout>
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
                </DrawerLayout>
            </BrowserRouter>
        </div>
    );
};

export default Application;
