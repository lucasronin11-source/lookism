import React, { useState } from 'react';

const relationships = [
    'Parent', 'Child', 'Sibling', 'Guardian', 'Caregiver', 'Other'
];

const RegisterForm: React.FC = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [relationship, setRelationship] = useState('');
    const [otherRelationship, setOtherRelationship] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // Show/hide other relationship field
    const showOther = relationship === 'Other';

    const validate = () => {
        if (
            !fName.trim() ||
            !lName.trim() ||
            !phoneNumber.trim() ||
            !relationship ||
            (relationship === 'Other' && !otherRelationship.trim()) ||
            !deviceId.trim() ||
            !password ||
            !confirmPassword
        ) {
            setErrorMsg('Please fill in all fields!');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match!');
            return false;
        }
        if (password.length < 8) {
            setErrorMsg('Password must be at least 8 characters long!');
            return false;
        }
        if (!/^[0-9+\-\s\(\)]+$/.test(phoneNumber)) {
            setErrorMsg('Please enter a valid phone number!');
            return false;
        }
        if (!terms) {
            setErrorMsg('You must accept the Terms and Conditions.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!validate()) return;

        setLoading(true);

        try {
            const rel = relationship === 'Other' ? otherRelationship : relationship;
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: fName.trim(),
                    lastName: lName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    relationship: rel,
                    deviceId: deviceId.trim(),
                    password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMsg('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                setErrorMsg(data.message || 'Registration failed');
            }
        } catch {
            setErrorMsg('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fName" className="block text-sm font-medium text-gray-700 mb-2 required">
                        First Name
                    </label>
                    <input
                        id="fName"
                        type="text"
                        required
                        value={fName}
                        onChange={e => setFName(e.target.value)}
                        className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter first name"
                    />
                </div>
                <div>
                    <label htmlFor="lName" className="block text-sm font-medium text-gray-700 mb-2 required">
                        Last Name
                    </label>
                    <input
                        id="lName"
                        type="text"
                        required
                        value={lName}
                        onChange={e => setLName(e.target.value)}
                        className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter last name"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="pNumber" className="block text-sm font-medium text-gray-700 mb-2 required">
                    Phone Number
                </label>
                <input
                    id="pNumber"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value.replace(/[^\d+\-\s\(\)]/g, ''))}
                    className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                />
            </div>
            <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2 required">
                    Relationship to User
                </label>
                <select
                    id="relationship"
                    required
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select relationship</option>
                    {relationships.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                    ))}
                </select>
            </div>
            {showOther && (
                <div>
                    <label htmlFor="otherRelationship" className="block text-sm font-medium text-gray-700 mb-2">
                        Please specify relationship
                    </label>
                    <input
                        id="otherRelationship"
                        type="text"
                        required
                        value={otherRelationship}
                        onChange={e => setOtherRelationship(e.target.value)}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter relationship"
                    />
                </div>
            )}
            <div>
                <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700 mb-2 required">
                    Device ID
                </label>
                <input
                    id="deviceId"
                    type="text"
                    required
                    value={deviceId}
                    onChange={e => setDeviceId(e.target.value.replace(/\s/g, '').toUpperCase())}
                    className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter device ID"
                />
                <p className="mt-1 text-sm text-gray-500">The unique ID of the tracking device</p>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 required">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Create password"
                />
                <p className="mt-1 text-sm text-gray-500">Minimum 8 characters with letters and numbers</p>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 required">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="form-input pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm password"
                />
            </div>
            <div className="flex items-start">
                <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={terms}
                    onChange={e => setTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="/terms" className="font-medium text-blue-600 hover:text-blue-500">Terms and Conditions</a> and <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>
                </label>
            </div>
            {errorMsg && (
                <div className="error-notification">
                    <span>{errorMsg}</span>
                </div>
            )}
            {successMsg && (
                <div className="success-notification">
                    <span>{successMsg}</span>
                </div>
            )}
            <button
                type="submit"
                className="btn-primary w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;