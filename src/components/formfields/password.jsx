import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export const PasswordField = ({ value, onChange, validatePassword, isSignup }) => {
    return (
        <Form.Item
            name="password"
            rules={
                isSignup && validatePassword
                    ? [{ validator: (_, value) => validatePassword(value).isValid ? Promise.resolve() : Promise.reject(validatePassword(value).error) }]
                    : [{ required: true, message: 'Por favor, ingrese su contraseña.' }]
            }
        >
            <Input.Password
                onChange={(e) => onChange(e)}
                value={value}
                size="large"
                placeholder="Contraseña"
                prefix={<LockOutlined className="authIcon" />}
            />
        </Form.Item>
    );
};

export const ConfirmPasswordField = ({ value, onChange, password, validateConfirmPassword }) => {
    return (

        <Form.Item
            name="passwordConfirm"
            rules={[
                {
                    validator: (_, value) => {
                        const { isValid, error } = validateConfirmPassword(password, value);
                        return isValid ? Promise.resolve() : Promise.reject(error);
                    }
                },
            ]}
        >
            <Input.Password
                onChange={(e) => onChange(e)}
                value={value}
                size="large"
                placeholder="Confirmar Contraseña"
                prefix={<LockOutlined className="authIcon" />}
                // className="authInput"
            />
        </Form.Item>
    );
};
