import { Alert } from 'antd';

const AppAlert = ({ type, message, onClose }) => {
    return (
        <Alert
            message={message}
            type={type}
            closable
            onClose={onClose}
            style={{ marginBottom: 16, width: '300px', textAlign: 'left' }}
        />
    )
}

export default AppAlert;