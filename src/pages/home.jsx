import { useNavigate } from 'react-router-dom';

import { Button, Typography, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import SurveyLayout from "../components/templates/survey_layout";

const { Title } = Typography;

/**
* HomePage Component
* 
* Landing page that displays different content based on user's survey completion status.
* Redirects to survey form or user answers depending on completion state.
* 
* @component
* @example
* // Basic usage (handles routing internally)
* return <HomePage />;
* 
* @example
* // User hasn't completed survey - shows "Completar encuesta" button → /survey
* // User has completed survey - shows "Ver mis respuestas" button → /myanswers
*/
export const HomePage = () => {
    const navigate = useNavigate();

    let userData;
    try {
        userData = JSON.parse(localStorage.getItem('user')) || {};
    } catch (error) {
        console.warn('Error al parsear user en localStorage:', error);
        userData = {};
    }

    const surveyCompleted = userData.survey_completed || false;
    const buttonText = surveyCompleted ? 'Ver mis respuestas' : 'Completar encuesta';
    const targetRoute = surveyCompleted ? '/myanswers' : '/survey';

    const handleButtonClick = () => {
        navigate(targetRoute);
    };

    return (
        <SurveyLayout page="survey">
            <Space direction="vertical" align="center" className='main-container' style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
                <FormOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={2}>Bienvenido</Title>
                <Button type="primary" size="large" onClick={handleButtonClick}>
                    {buttonText}
                </Button>
            </Space>
        </SurveyLayout>
    );
};