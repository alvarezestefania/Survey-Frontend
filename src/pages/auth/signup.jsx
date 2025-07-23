
import { useAuth } from "../../hooks/auth";
import AuthLayout from "../../components/templates/auth_layout"
import AuthForm from '../../components/forms/auth_form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppAlert from "../../components/alerts/alert";

/**
 * SignupPage Component
 * 
 * An user registration page that handles the complete signup flow
 * with user feedback, loading states, and automatic navigation. 
 * 
 * Features:
 * - Integrated with AuthContext for centralized authentication management
 * - Real-time error display with dismissible alerts
 * - Loading states during async operations
 * - Success notifications with automatic navigation
 * - Responsive layout using AuthLayout wrapper
 * - Form validation handled by AuthForm component
 * 
 */
export const SignupPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handlesignup = async ({ name, email, password }) => {
        setLoading(true);
        setError('');
        setSuccess('');
        const result = await signup({ name, email, password });

        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => navigate('/signin'), 1500);
        } else {
            setError(result.error);
        }

        setLoading(false);
    }

    return (
        <AuthLayout>
            {error && (
                <AppAlert
                    message={error}
                    type="error"
                    onClose={() => setError('')}
                />
            )}
            {success && (
                <AppAlert
                    message={success}
                    type="success"
                    onClose={() => setSuccess('')}
                />
            )}
            <AuthForm isSignup={true} onSubmit={handlesignup} loading={loading} />
        </AuthLayout>
    );
}
