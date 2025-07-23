import { Button } from 'antd';

const SubmitButton = ({ text, loading = false }) => {
    return (
        <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading}          
        >
            {text}
        </Button>
    )
}
export default SubmitButton;