import { Breadcrumb, Layout } from 'antd';
import AppNav from '../nav/app_nav';
import './survey_layout.css'

const { Header, Content, Footer } = Layout;

const SurveyLayout = ({ children, page }) => {

    const pageTitle = page === 'survey' ? 'Encuesta' : 'Mis respuestas';
    return (
        <Layout className='survey-layout'>
            <Header className='survey-header'>
                <AppNav />
            </Header>
            <Content className='survey-layout-container'>
                <Breadcrumb
                    className='breadcrumb'
                    items={[{ title: 'Smart Solutions' }, { title: pageTitle }]}
                />
                <div>
                    {children}
                </div>
            </Content>
            <Footer>
                Survey App ©{new Date().getFullYear()} Created by Estefanía Álvarez
            </Footer>
        </Layout>
    );
};
export default SurveyLayout;