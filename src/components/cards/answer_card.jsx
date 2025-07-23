import { Card, Typography, Flex } from 'antd';

const { Text } = Typography

const AnswerCard = ({ answer, question }) => {
    return (
        <Card title={question} variant="borderless">
            <Flex gap={"middle"}>
                <Text type="warning">Respuesta:</Text>
                <Text> {answer}</Text>
            </Flex>
        </Card>
    );
}

export default AnswerCard;