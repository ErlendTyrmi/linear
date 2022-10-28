import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './menu/DrawerLayout';
import MessageDisplay from './MessageDisplay';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import OtherPage from './pages/OtherPage';
import ProtectedRoute from './ProtectedRoute';

const Application = () => {
    return (
        <MessageDisplay>
            <BrowserRouter>
                {/* <MainMenu /> */}

                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <FrontPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/other"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <OtherPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/third"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <OtherPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/fourth"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <OtherPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/fifth"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <OtherPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </MessageDisplay>
    );
};

export default Application;
