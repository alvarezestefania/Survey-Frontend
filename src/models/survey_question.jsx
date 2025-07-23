export class SurveyQuestion {
    constructor(id, description, type, options) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.options = this.parseOptions(options, type);
    }

    parseOptions(options) {

        if (Array.isArray(options)) return options;

        if (typeof options === 'string') {
            try {
                const parsed = JSON.parse(options);
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                console.warn(`Error parsing options:`, error);
                return [];
            }
        }

        return [];
    }

    static fromJson(json) {
        return new SurveyQuestion(
            json.id,
            json.description,
            json.type,
            json.options
        );
    }

    static fromJsonArray(jsonArray) {
        return jsonArray.map(item => SurveyQuestion.fromJson(item));
    }
}