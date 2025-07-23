import { useEffect, useState } from 'react';
import { useSurvey } from "../../hooks/survey";

import SurveyLayout from "../../components/templates/survey_layout";
import AppAlert from "../../components/alerts/alert";
import AnswerCard from "../../components/cards/answer_card"
import { Spin, Typography } from 'antd';

const { Text } = Typography;


export const UserAnswersPage = () => {
    const { getUserAnswers } = useSurvey();
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchQuestions = async () => {
            setLoading(true)
            const result = await getUserAnswers();
            if (result.success === false) {
                setLoading(false)
                setError(result.error);
            } else {
                setLoading(false)
                setAnswers(result.list);
            }
        };
        fetchQuestions();
    }, [getUserAnswers]);

    return (
        <SurveyLayout page="myanswers">
            {error && <AppAlert
                message={error}
                type="error"
                onClose={() => setError('')}
            />}
            <Spin spinning={loading} tip="Cargando Respuestas...">
                <div className="min-h-[200px]">
                    {answers.length > 0 ? (
                        answers.map((item, index) => (
                            <AnswerCard
                                key={index}
                                question={item.questionDescription}
                                answer={item.answer}
                            />
                        ))
                    ) : (
                        !loading && <Text>No hay respuesya registradas aún.</Text>
                    )}
                </div>
            </Spin>
        </SurveyLayout>
    )
}