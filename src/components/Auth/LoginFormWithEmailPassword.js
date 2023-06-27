import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import Button from '../Button/Button';
import LoginFormWithPhoneCode from './LoginFormWithPhoneCode';
import { useState } from 'react';
import { StringUtils } from '~/utils';
import { LoadingIcon } from '../Icons';
import { FastField, Form, Formik } from 'formik';
import InputField from './InputField';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

LoginFormWithEmailPassword.propTypes = {
    onClick: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};

function LoginFormWithEmailPassword({ onClick, onSubmitForm }) {
    const [loading, setLoading] = useState(false);

    // const handleSubmit = (values) => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // };

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('This field is required'),
        password: Yup.string().required('This field is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            validator={() => ({})}
        >
            {(formikProps) => {
                const { values } = formikProps;

                return (
                    <Form className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('description-title')}>
                                <p>Email or username</p>
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
                                    Log in with phone
                                </Button>
                            </div>
                            <FastField
                                name="email"
                                component={InputField}
                                type="text"
                                label="Email or username"
                                placeholder="Email or username"
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
                            </div>
                            <Button
                                type="submit"
                                disabled={StringUtils.isEmpty(values.email) || StringUtils.isEmpty(values.password)}
                                primary
                                className={cx('btn-login')}
                            >
                                {loading ? <LoadingIcon className={cx('loading-code-icon')} /> : ' Log in'}
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default LoginFormWithEmailPassword;
