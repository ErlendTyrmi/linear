import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './layout/DrawerLayout';
import MessageDisplay from './layout/MessageDisplay';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewOrderPage from './pages/NewOrderPage';
import ProtectedRoute from './layout/ProtectedRoute';
import AdvertiserSelectModal from './menu/AdvertiserSelectModal';
import { appText } from './appText';
import OrdersPage from './pages/OrdersPage';
import StatusPage from './pages/StatusPage';

export interface LinearMenuItem {
    name: string;
    url: string;
}

export const menuItems: LinearMenuItem[] = [
    { name: appText.menuNewOrder(), url: '/new-order' },
    { name: appText.menuOverview(), url: '/' },
    { name: appText.menuOrder(), url: '/order' },
    { name: appText.menuStatus(), url: '/status' }
];

const Application = () => {
    return (
        <MessageDisplay>
            <BrowserRouter>
                <DrawerLayout>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/new-order"
                            element={
                                <ProtectedRoute>
                                    <NewOrderPage />
                                </ProtectedRoute>
                            }
                        />
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
                                    <OrdersPage />
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
                                    <NewOrderPage />
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
