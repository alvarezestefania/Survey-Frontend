import { Form, Flex } from 'antd';
import getSurveyField from "../../components/formfields/survey_fields";
import SubmitButton from "../buttons/button";

const SurveyForm = ({ onSubmit, loading = false, questions }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            name="surveyForm"
            onFinish={onSubmit}
            layout="vertical"
        >
            {questions.map((question) => (
                <Form.Item
                    key={question.id}
                    name={`question_${question.id}`}
                    label={question.description}
                    rules={[{ required: true, message: 'Este campo es obligatorio.' }]}
                >
                    {getSurveyField(question.type, question.options || {})}
                </Form.Item>
            ))}
            <Form.Item>
                <Flex gap="small">
                    <SubmitButton text={"Enviar Encuesta"} loading={loading} />
                </Flex>
            </Form.Item>
        </Form>
    );
}

export default SurveyForm;