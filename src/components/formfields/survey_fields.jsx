import { Input, Radio, Slider, Checkbox, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

/**
* getSurveyField Function
* 
* Renders different form field components based on the field type for survey forms.
* 
* @function
* @param {string} type - The type of field to render ('text', 'radio', 'range', 'number', 'checkbox', 'select')
* @param {Object|Array} options - Configuration options for the field
* @param {number} [options.min=1] - Minimum value for range slider
* @param {number} [options.max=10] - Maximum value for range slider
* @param {Object} [options.labels] - Custom labels for range slider marks
* @returns {JSX.Element} The appropriate form field component
* 
* @example
* // Text area field
* const textField = getSurveyField('text');
* 
* @example
* // Radio group with options
* const radioField = getSurveyField('radio', ['Opción 1', 'Opción 2', 'Opción 3']);
* 
* @example
* // Range slider with custom settings
* const rangeField = getSurveyField('range', {
*   min: 1,
*   max: 5,
*   labels: { 1: 'Muy bajo', 5: 'Muy alto' }
* });
*/
const getSurveyField = (type, options) => {
    switch (type) {
        case 'text':
            return <TextArea rows={4} />;
        case 'radio':
            return (
                <Radio.Group>
                    {(Array.isArray(options) ? options : []).map((option, index) => (
                        <Radio key={index} value={option}>{option}</Radio>
                    ))}
                </Radio.Group>
            );
        case 'range':
            return (
                <Slider
                    min={options?.min || 1}
                    max={options?.max || 10}
                    marks={{
                        [options?.min || 1]: options?.labels?.[options?.min || 1] || 'Difícil',
                        [options?.max || 10]: options?.labels?.[options?.max || 10] || 'Fácil'
                    }}
                />
            );
        case 'number':
            return <Input type="number" min={0} />;
        case 'checkbox':
            return (
                <Checkbox.Group>
                    {(Array.isArray(options) ? options : []).map((option, index) => (
                        <Checkbox key={index} value={option}>{option}</Checkbox>
                    ))}
                </Checkbox.Group>
            );
        case 'select':
            return (
                <Select>
                    {(Array.isArray(options) ? options : []).map((option, index) => (
                        <Option key={index} value={option}>{option}</Option>
                    ))}
                </Select>
            );
        default:
            return <Input />;
    }
};

export default getSurveyField;