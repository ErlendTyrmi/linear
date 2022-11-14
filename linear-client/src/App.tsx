import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './layout/DrawerLayout';
import MessageDisplay from './layout/MessageDisplay';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import OtherPage from './pages/OtherPage';
import ProtectedRoute from './layout/ProtectedRoute';
import AdvertiserSelectModal from './menu/AdvertiserSelectModal';
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

                        <Route
                            path="/order"
                            element={
                                <ProtectedRoute>
                                    <OrderPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/status"
                            element={
                                <ProtectedRoute>
                                    <StatusPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/fifth"
                            element={
                                <ProtectedRoute>
                                    <OtherPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </DrawerLayout>
            </BrowserRouter>
        </MessageDisplay>
    );
};

export default Application;
