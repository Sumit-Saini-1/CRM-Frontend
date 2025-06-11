import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { apiFetch } from '../lib/api';
import { loginSuccess } from '../store/slices/authSlice';
import type { RootState } from '../store';

interface LoginResponse {
    token: string;
    username: string;
    // add any other fields you expect from the API
}  

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [token, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            }) as LoginResponse;

            dispatch(loginSuccess(data.token));
            navigate('/dashboard');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Something went wrong.');
            }
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <Input
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} type={'text'}/>

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-4"  
                />

                <Button type="submit" className="mt-6 w-full" onClick={handleSubmit}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
