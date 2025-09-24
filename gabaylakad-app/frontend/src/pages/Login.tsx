import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!fullName || !password) {
            setErrorMsg('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/auth/login', { fullName, password });
            setSuccessMsg(response.data.message || 'Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error: any) {
            setErrorMsg(error.response?.data?.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Features */}
                    <div className="hidden lg:block">
                        {/* ...features and info, copy from your HTML... */}
                    </div>
                    {/* Right Side - Login Form */}
                    <div className="relative">
                        <div className="login-container relative bg-white">
                            <div className="p-8">
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                                        <i className="fas fa-sign-in-alt text-blue-600 text-2xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Caregiver Login</h3>
                                    <p className="text-gray-600">Access your secure dashboard to monitor and support your loved one</p>
                                </div>
                                {successMsg && (
                                    <div className="success-notification">
                                        <i className="fas fa-check-circle"></i>
                                        <span>{successMsg}</span>
                                    </div>
                                )}
                                {errorMsg && (
                                    <div className="error-notification">
                                        <i className="fas fa-exclamation-circle"></i>
                                        <span>{errorMsg}</span>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <i className="fas fa-user text-gray-400"></i>
                                            </div>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={e => setFullName(e.target.value)}
                                                className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <i className="fas fa-lock text-gray-400"></i>
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className="form-input pl-10 pr-12 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your password"
                                            />
                                            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="toggleIcon"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="text-sm">
                                            <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn-primary w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-semibold transition-all" disabled={loading}>
                                            {loading ? <span className="loading-spinner"></span> : 'Sign in to Dashboard'}
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?
                                        <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                            Register now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* ...decorative elements and mobile features... */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;