import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import Button from '../Button/Button';
import LoginFormWithPhoneCode from './LoginFormWithPhoneCode';
import LoginFormWithEmailPassword from './LoginFormWithEmailPassword';
import { StringUtils } from '~/utils';
import { FastField, Form, Formik } from 'formik';
import InputField from './InputField';
import PhoneInputField from './PhoneInputField';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

LoginFormWithPhonePassword.propTypes = {
    onClick: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};

function LoginFormWithPhonePassword({ onClick, onSubmitForm }) {
    const initialValues = {
        phone: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        phone: Yup.number('Your phone must be a number').required('This field is required'),
        password: Yup.string().required('This field is required'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm}>
            {(formikProps) => {
                const { values, isSubmitting } = formikProps;
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

                            <FastField
                                name="phone"
                                component={PhoneInputField}
                                type="text"
                                label="Phone"
                                placeholder="Phone number"
                            />
                            <FastField
                                name="password"
                                component={InputField}
                                type="password"
                                label="Password"
                                placeholder="Password"
                            />
                            <div className={cx('description-title-password')}>
                                <Button className={cx('switch-type')} text>
                                    Forgot password?
                                </Button>
                                <span className={cx('split-line')}></span>
                                <Button
                                    onClick={() => {
                                        onClick({
                                            children: {
                                                data: [
                                                    {
                                                        Component: LoginFormWithPhoneCode,
                                                    },
                                                ],
                                            },
                                        });
                                    }}
                                    className={cx('switch-type')}
                                    text
                                >
                                    Log in with code
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                disabled={StringUtils.isEmpty(values.phone) || StringUtils.isEmpty(values.password)}
                                primary
                                className={cx('btn-login')}
                            >
                                {isSubmitting && <LoadingIcon className={cx('loading-code-icon')} />} Log in
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default LoginFormWithPhonePassword;
