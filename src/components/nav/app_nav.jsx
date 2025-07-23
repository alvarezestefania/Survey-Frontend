import { useAuth } from '../../hooks/auth';

import './app_nav.css';
import { Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const AppNav = () => {
    const { signout } = useAuth();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.name || 'Usuario';

    const menuItems = [
        {
            key: 'logout',
            label: 'Logout',
            onClick: () => signout(),
        },
    ];

    return (
        <div className='nav-container'>
            <span>Hola, {userName}</span>
            <Dropdown
                menu={{ items: menuItems }}
                trigger={['click']}
                placement="bottomRight"
            >
                <Space className='nav-icon'>
                    <UserOutlined />
                </Space>
            </Dropdown>
        </div>
    );
};

export default AppNav;