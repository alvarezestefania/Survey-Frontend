import { Flex, Layout, Typography, Col } from 'antd';
import './auth_layout.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const AuthLayout = ({ children }) => (
    <Flex gap="middle" wrap>
        <Layout className='layoutStyle'>
            <Header className='headerStyle'><Flex justify="space-between" align="center" style={{ height: '100%' }}>
                <Title level={4} className='layout-title'>
                    Estefanía Álvarez
                </Title>
                <Title level={4} className='layout-title'>
                    APP DE ENCUESTA
                </Title>
            </Flex></Header>
            <Content className='contentStyle'>
                <Col>
                    {children}
                </Col>
            </Content>
        </Layout>
    </Flex>
);

export default AuthLayout;