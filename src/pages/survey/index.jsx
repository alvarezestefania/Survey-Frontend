import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from "../../hooks/survey";

import SurveyLayout from "../../components/templates/survey_layout";
import SurveyForm from '../../components/forms/survey_form';

import { SurveyAnswer } from '../../models/survey_answer';


export const SurveyPage = () => {
    const navigate = useNavigate();
    const { getSurveyQuestions, registerSurveyAnswers } = useSurvey();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await getSurveyQuestions();
            if (result.success === false) {
                setError(result.error);
            } else {
                setQuestions(result.list);
            }
        };
        fetchQuestions();
    }, [getSurveyQuestions]);


    const registerAnswers = useCallback(async (values) => {
        setLoading(true);
        setError(null);

        const answers = Object.entries(values).map(([questionKey, answer]) => {
            const questionId = parseInt(questionKey.replace('question_', ''), 10);
            return new SurveyAnswer({ questionId, answer });
        });

        const result = await registerSurveyAnswers({ answers });

        setLoading(false);
        if (!result.success) {
            setError(result.error);
        }

        navigate("/")

    }, [registerSurveyAnswers, navigate]);

    return (
        <SurveyLayout page="survey">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <SurveyForm onSubmit={registerAnswers} loading={loading} questions={questions} />
        </SurveyLayout>
    );
};