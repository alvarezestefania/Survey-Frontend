import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const NameField = ({ value, onChange }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
        onChange(filteredValue);
    };

    return (
        <Form.Item
            name="name"
            rules={[
                { required: true, message: 'Por favor, ingrese su nombre.' },
                { pattern: /^[A-Za-z\s]+$/, message: 'El nombre solo puede contener letras y espacios.' },
            ]}
        >
            <Input
                onChange={handleChange}
                value={value}
                size="large"
                placeholder="Nombre"
                prefix={<UserOutlined className="authIcon" />}
            />
        </Form.Item>
    );
};

export default NameField;