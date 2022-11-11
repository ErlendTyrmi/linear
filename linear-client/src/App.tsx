import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './layout/DrawerLayout';
import MessageDisplay from './layout/MessageDisplay';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import OtherPage from './pages/OtherPage';
import ProtectedRoute from './layout/ProtectedRoute';
import AdvertiserSelectPage from './pages/AdvertiserSelectPage';

const Application = () => {
    return (
        <MessageDisplay>
            <BrowserRouter>
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
                        path="/advertiser"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <AdvertiserSelectPage />
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
