import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import { Shield, Lock, User } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginAdmin(username, password);
            if (data.success) {
                localStorage.setItem('token', data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-prime flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-secondary"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent mb-4">
                        <Shield size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                    <p className="text-gray-400 text-sm">Valid credentials required for entry</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                className="w-full bg-surface border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                className="w-full bg-surface border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-accent text-black font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
