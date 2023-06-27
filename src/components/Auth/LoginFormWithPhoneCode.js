import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import Button from '../Button/Button';
import LoginFormWithPhonePassword from './LoginFormWithPhonePassword';
import LoginFormWithEmailPassword from './LoginFormWithEmailPassword';
import { FastField, Formik, Form, Field } from 'formik';
import PhoneInputField from './PhoneInputField';
import InputCodeField from './InputCodeField';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

LoginFormWithPhoneCode.propTypes = {
    onClick: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};

function LoginFormWithPhoneCode({ onClick, onSubmitForm }) {
    const initialValues = {
        phone: '',
        code: '',
    };
    const validationSchema = Yup.object().shape({
        phone: Yup.number().required('This field is required'),
        code: Yup.string().when('phone', {
            is: (val) => {
                return Number.isInteger(val);
            },
            then: (schema) => schema.min(6).max(6).required(),
            otherwise: (schema) => schema.notRequired(),
        }),
    });
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm}>
            {(formikProps) => {
                return (
                    <Form className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('description-title')}>
                                <p>Phone</p>
                                <Button
                                    onClick={() => {
                                        onClick({
                                            children: {
                                                data: [
                                                    {
                                                        Component: LoginFormWithEmailPassword,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                    className={cx('switch-type')}
                                    text
                                >
                                    Log in with email or username
                                </Button>
                            </div>
                            <Field
                                name="phone"
                                component={PhoneInputField}
                                type="text"
                                label="Phone"
                                placeholder="Phone number"
                            />

                            <FastField
                                name="code"
                                component={InputCodeField}
                                type="text"
                                label="Code"
                                placeholder="Enter 6-digit code"
                            />

                            <div className={cx('description-title-password')}>
                                <Button
                                    onClick={() => {
                                        onClick({
                                            children: {
                                                data: [
                                                    {
                                                        Component: LoginFormWithPhonePassword,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                    className={cx('switch-type')}
                                    text
                                >
                                    Log in with password
                                </Button>
                            </div>
                            <Button type="submit" primary className={cx('btn-login')}>
                                Log in
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default LoginFormWithPhoneCode;
