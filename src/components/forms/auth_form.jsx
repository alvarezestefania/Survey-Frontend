import { useState } from 'react';

import { Form, Col, Typography } from 'antd';
import SubmitButton from '../buttons/button'
import './auth_form.css'

import NameField from '../formfields/name';
import EmailField from '../formfields/email';
import { ConfirmPasswordField, PasswordField } from '../formfields/password';

import useFormValidation from '../../hooks/auth/validators'

const { Link } = Typography;

/**
 * AuthForm Component
 * 
 * Features:
 * - Dynamic field rendering (name and confirm password only appear in signup mode)
 * - Real-time form validation with custom validation hooks
 * - Integrated loading states for async operations
 * 
 * @component
 * @example
 * // Login form usage
 * const handleLogin = (credentials) => {
 *   console.log('Login data:', credentials); // { email, password }
 * };
 * 
 * return (
 *   <AuthForm 
 *     isSignup={false}
 *     onSubmit={handleLogin}
 *     loading={isLoggingIn}
 *   />
 * );
 * 
 * @example
 * // Signup form usage
 * const handleSignup = (userData) => {
 *   console.log('Signup data:', userData); // { name, email, password, passwordConfirm }
 * };
 * 
 * return (
 *   <AuthForm 
 *     isSignup={true}
 *     onSubmit={handleSignup}
 *     loading={isRegistering}
 *   />
 * );
 * 
 */
const AuthForm = ({ isSignup = false, onSubmit, loading = false }) => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { validatePassword, validateConfirmPassword } = useFormValidation();

    const handleSubmit = () => {

        // Only validate passwords if isSignup is true
        const passwordValidation = isSignup ? validatePassword(password) : { isValid: true, error: '' };
        const confirmPasswordValidation = isSignup ? validateConfirmPassword(password, passwordConfirm) : { isValid: true, error: '' };

        if (passwordValidation.isValid && confirmPasswordValidation.isValid) {
            if (isSignup) {
                onSubmit({ name, email, password, passwordConfirm });
            } else {
                onSubmit({ email, password });
            }
        } else {
            form.setFields([
                { name: 'password', errors: [passwordValidation.error] },
                ...(isSignup ? [{ name: 'passwordConfirm', errors: [confirmPasswordValidation.error] }] : []),
            ]);
        }
    };

    return (
        <Col span={24} className='form-container'>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                align="center"
            >
                {isSignup && (
                    <NameField value={name} onChange={setName} />
                )}

                <EmailField value={email} onChange={setEmail} isSignup={isSignup}/>
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    validatePassword={isSignup ? validatePassword : null}
                    isSignup={isSignup}
                />

                {isSignup && (
                    <ConfirmPasswordField
                        value={passwordConfirm}
                        password={password}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        validateConfirmPassword={(confirm) => validateConfirmPassword(password, confirm)}
                    />
                )}

                <Form.Item>
                    <SubmitButton text={isSignup ? 'Registrarme' : 'Iniciar Sesión'} loading={loading} />
                </Form.Item>
                <Link href={isSignup ? '/signin' : '/signup'}>
                    {isSignup ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </Link>

            </Form>
        </Col>
    );
};

export default AuthForm;