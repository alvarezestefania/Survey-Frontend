import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const EmailField = ({ value, onChange, isSignup }) => {
    return (
        <Form.Item
            name="email"
            rules={
                isSignup ?
                    [{ required: true, message: 'Por favor, ingrese su correo.' },
                    { type: 'email', message: 'Por favor, ingrese un correo válido.', }] :
                    [{ required: true, message: 'Por favor, ingrese su correo.' }]}
        >
            <Input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                size="large"
                placeholder="Correo"
                prefix={<MailOutlined className="authIcon" />}
            />
        </Form.Item>
    );
};

export default EmailField;