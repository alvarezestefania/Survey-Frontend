import { createContext, useCallback, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';

import { getSurveyQuestions as getSurveyAPI } from '../../services/api/survey';
import { registerSurveyAnswers as registerAnswerAPI } from '../../services/api/survey';
import { getUserAnswers as getAnswerAPI } from '../../services/api/survey';


const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {

    const [cookies] = useCookies(['token']);

    const getSurveyQuestions = useCallback(async () => {
        try {
            const token = cookies.token;
            const result = await getSurveyAPI({ token });
            if (result.success) {
                return {
                    list: result.data
                };
            } else {
                return {
                    success: false,
                    error: result.error || "Error al obtener preguntas de encuesta."
                };
            }
        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }

    }, [cookies]);

    const registerSurveyAnswers = useCallback(async ({ answers }) => {
        try {
            const token = cookies.token;

            const formattedAnswers = answers.map(answer => answer.toJson());
            const result = await registerAnswerAPI({
                token: token,
                answers: formattedAnswers,
            });

            if (result.success) {
                
                // update the user survey status
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user && typeof user === 'object') {
                    user.survey_completed = true;
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return {
                    success: true,
                    message: result.message || 'Respuestas registradas con éxito.',
                };

            } else {
                return { success: false, error: result.error || 'Error al registrar las respuestas.' };
            }

        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }

    }, [cookies])

    const getUserAnswers = useCallback(async () => {
        try {
            const token = cookies.token;
            const result = await getAnswerAPI({ token });

            if (result.success) {
                return {
                    survey_completed_at: result.data.survey_completed_at,
                    list: result.data.answers
                };
            } else {
                return {
                    success: false,
                    error: result.error || "Error al obtener respuestas de encuesta."
                };
            }
        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }
    }, [cookies])

    // Memoized context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            getSurveyQuestions,
            registerSurveyAnswers,
            getUserAnswers
        }),
        [getSurveyQuestions, registerSurveyAnswers, getUserAnswers]
    );

    return (
        <SurveyContext.Provider value={value}>
            {children}
        </SurveyContext.Provider>
    )
}

export const useSurvey = () => {
    const context = useContext(SurveyContext);

    // Runtime check to ensure hook is used within provider
    if (context === undefined) {
        throw new Error('useSurvey must be used within an AuthProvider');
    }

    return context;
};
