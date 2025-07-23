import axios from "axios";
import { SurveyQuestion } from "../../models/survey_question"
import { SurveyAnswerView } from "../../models/survey_answer_view"

export const getSurveyQuestions = async ({ token }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SURVEY_API}/questions`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );
        
        const data = response.data;
        if (response.status !== 200 && response.status !== 200) {
            return { success: false, data: "Error al obtener preguntas de encuesta." };
        }

        const questions = SurveyQuestion.fromJsonArray(data.result);
        return { success: true, data: questions };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
}

export const registerSurveyAnswers = async ({ token, answers }) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_SURVEY_API}/answers`,
            { answers: answers },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );

        if (response.status !== 200 && response.status !== 200) {
            return { success: false, data: "Error al registrar las respuestas." };
        }

        return { success: true, message: "Las encuesta ha sido registrada con éxito." };
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
}

export const getUserAnswers = async ({ token }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SURVEY_API}/my-answers`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );

        const data = response.data;
        if (response.status !== 200 && response.status !== 200) {
            return { success: false, data: "Error al obtener preguntas de encuesta." };
        }

        const answers = SurveyAnswerView.fromJsonArray(data.result.answers);

        return {
            success: true,
            data: {
                answers: answers,
                survey_completed_at: data.result.survey_completed_at || null
            }
        };

    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
}