import { Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';

import './form.scss'

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error_message" >{meta.error}</div>
            ) : null}
        </> 
    )
};

const MyCheckBox = ({ children, ...props }) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <label className='checkbox'>
                <input type="checkbox" {...props} {...field} />
                {children}
            </label>
            
            {meta.touched && meta.error ? (
                <div className="error_message" >{meta.error}</div>
            ) : null}
        </>
    )
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error_message" >{meta.error}</div>
            ) : null}
        </>
    )
}

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error_message" >{meta.error}</div>
            ) : null}
        </>
    )
};

const CustomForm = () => {
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(3, 'Must be 3 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                amount: Yup.number()
                    .min(1, 'Must be 1 or more')
                    .max(1000, 'Must be 1000 or less')
                    .required('Required'),
                currency: Yup.string()
                    .oneOf(['USD', 'UAH', 'EUR'], 'You must choose currency')
                    .required('Required'),
                text: Yup.string()
                    .min(10, 'Must be 10 characters or more')
                    .max(300, 'Must be 300 characters or less'),
                terms: Yup.boolean()
                    .oneOf([true], 'You must agree with our privacy policy')
                    .required('Required'),
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Send a donation</h2>
                {/* <label htmlFor="name">Your name</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className="error_message" name="name" component="div" /> */}
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                />

                {/* <label htmlFor="email">Your mail</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error_message" name="email" component="div" /> */}
                <MyTextInput
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                />

                {/* <label htmlFor="amount">Quantity</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error_message" name="amount" component="div" /> */}
                <MyTextInput
                    label="Quantity"
                    id="amount"
                    name="amount"
                    type="number"
                />
                
                {/* <label htmlFor="currency">Currency</label>
                <Field
                    as="select"
                    id="currency"
                    name="currency">
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
                </Field>
                <ErrorMessage className="error_message" name="currency" component="div" /> */} 
                <MySelect
                    label="Currency"
                    id="currency"
                    name="currency">
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
                </MySelect>
                
                {/* <label htmlFor="text">Your message</label>
                <Field
                    as="textarea"
                    id="text"
                    name="text"
                />
                <ErrorMessage className="error_message" name="text" component="div" /> */}
                <MyTextArea
                    label="Your message"
                    id="text"
                    name="text"
                />

                {/* <label className="checkbox">
                    <Field
                        name="terms"
                        type="checkbox" />
                    Agree with privacy policy?
                </label>
                <ErrorMessage className="error_message" name="terms" component="div" /> */}
                <MyCheckBox name="terms">
                    Agree with privacy policy?
                </MyCheckBox> 
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

// const validate = (values) => {
//     const errors = {};
    
//     if (!values.name) {
//         errors.name = 'Required';
//     } else if (values.name.length > 15) {
//         errors.name = 'Must be 15 characters or less';
//     } else if (values.name.length < 3) {
//         errors.name = 'Must be 3 characters or more';
//     }

//     if (!values.email) {
//         errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }

//     return errors;
// }

export default CustomForm;