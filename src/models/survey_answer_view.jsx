/**
* SurveyAnswerView Class
* 
* Model specifically designed for displaying survey answers retrieved from the API.
* Handles answer formatting and provides convenient conversion methods from JSON responses.
* 
* @class
* @example
* // Create instance manually
* const answerView = new SurveyAnswerView({
*   id: 1,
*   questionId: 5,
*   questionDescription: "¿Cómo calificarías el servicio?",
*   answer: ["Excelente", "Bueno"]
* });
* 
* @example
* // Create from API response
* const apiResponse = {
*   id: 1,
*   question_id: 5,
*   question_description: "¿Cómo calificarías el servicio?",
*   answer: '["Excelente", "Bueno"]'
* };
* const answerView = SurveyAnswerView.fromJson(apiResponse);
* 
* @example
* // Create multiple instances from API array
* const answers = SurveyAnswerView.fromJsonArray(apiResponseArray);
*/
export class SurveyAnswerView {

    constructor({ id, questionId, questionDescription, answer }) {
        this.id = id;
        this.questionId = questionId;
        this.questionDescription = questionDescription;
        this.answer = Array.isArray(answer) ? answer.join(', ') : answer;
    }

    static fromJson(json) {
        return new SurveyAnswerView({
            id: json.id,
            questionId: json.question_id,
            questionDescription: json.question_description,
            answer: this.formatAnswer(json.answer),
        });
    }

    static fromJsonArray(jsonArray) {
        return jsonArray.map(json => SurveyAnswerView.fromJson(json));
    }

    static formatAnswer(answer) {
        if (typeof answer === 'string') {
            try {
                const parsed = JSON.parse(answer);
                if (Array.isArray(parsed)) {
                    return parsed.join(', ');
                }
                return answer;
            } catch {
                return answer;
            }
        }

        if (Array.isArray(answer)) {
            return answer.join(', ');
        }

        return answer ?? '';
    }
}
