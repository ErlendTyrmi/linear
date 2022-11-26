import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DrawerLayout from './layout/DrawerLayout';
import MessageDisplay from './layout/MessageDisplay';
import FrontPage from './pages/FrontPage/FrontPage';
import LoginPage from './pages/LoginPage/LoginPage';
import BookingPage from './pages/Booking/BookingPage';
import ProtectedRoute from './layout/ProtectedRoute';
import { appText } from './assets/appText';
import OrdersPage from './pages/ordersPage/OrdersPage';
import StatusPage from './pages/StatusPage';
import NewsPage from './pages/NewsPage';

export interface LinearMenuItem {
    name: string;
    url: string;
}

export const menuItems: LinearMenuItem[] = [
    { name: appText.menuOverview(), url: '/' },
    { name: appText.menuBooking(), url: '/booking' },
    { name: appText.menuOrders(), url: '/order' },
    { name: appText.menuNews(), url: '/news' },
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
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <FrontPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/booking"
                            element={
                                <ProtectedRoute>
                                    <BookingPage />
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
                            path="/news"
                            element={
                                <ProtectedRoute>
                                    <NewsPage />
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
