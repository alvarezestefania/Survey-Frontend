
import { useAuth } from "../../hooks/auth";
import { useState } from 'react';

import AuthLayout from "../../components/templates/auth_layout"
import AuthForm from '../../components/forms/auth_form';
import AppAlert from "../../components/alerts/alert";

export const SigninPage = () => {
    const { signin } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignin = async ({ email, password }) => {
        setLoading(true);
        setError('');

        const result = await signin({ email, password });

        if (!result.success) {
            setError(result.error);
        } 

        setLoading(false);
    };

    return (
        <AuthLayout>
            {error && (
                <AppAlert
                    message={error}
                    type="error"
                    onClose={() => setError('')}
                />
            )}
            <AuthForm isSignup={false} onSubmit={handleSignin} loading={loading} />
        </AuthLayout>
    )
}
