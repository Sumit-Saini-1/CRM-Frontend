import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import EditProduct from '../pages/EditProduct';
import AddProduct from '../pages/AddProduct';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <AppLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'products/new',
                element: <AddProduct />,
            },
            {
                path: 'products/:id',
                element: <ProductDetail />,
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct />,
            },
        ],
    },
]);

export default router;
