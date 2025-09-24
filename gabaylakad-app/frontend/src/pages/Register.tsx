import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;