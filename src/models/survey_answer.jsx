export class SurveyAnswer {
    constructor({ questionId, answer }) {
        this.questionId = questionId;
        this.answer = answer;
    }

    static fromJson(json) {
        return new SurveyAnswer({
            questionId: json.question_id,
            answer: json.answer,
        });
    }

    static fromJsonArray(jsonArray) {
        return jsonArray.map(json => SurveyAnswer.fromJson(json));
    }

    toJson() {
        return {
            question_id: this.questionId,
            answer: this.answer,
        };
    }
}