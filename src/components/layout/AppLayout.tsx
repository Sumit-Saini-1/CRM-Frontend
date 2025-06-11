import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">My App</div>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:underline">Products</Link>
                    </li>
                    <li>
                        <Link to="/products/new" className="hover:underline">Add Product</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={handleLogout} className="hover:underline">Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
