import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './layout/DrawerLayout';
import MessageDisplay from './layout/MessageDisplay';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import OtherPage from './pages/OtherPage';
import ProtectedRoute from './layout/ProtectedRoute';
import AdvertiserSelectPage from './pages/AdvertiserSelectPage';
import { appText } from './appText';
import OrderPage from './pages/OrderPage';
import StatusPage from './pages/StatusPage';

export interface LinearMenuItem {
    name: string;
    url: string;
}

export const menuItems: LinearMenuItem[] = [
    { name: appText.menuOverview(), url: '/' },
    { name: appText.menuOrder(), url: '/order' },
    { name: appText.menuStatus(), url: '/status' },
    { name: appText.menuAdvertiser(), url: '/advertiser' }
];

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
                        path="/order"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <OrderPage />
                                </DrawerLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/status"
                        element={
                            <ProtectedRoute>
                                <DrawerLayout>
                                    <StatusPage />
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
