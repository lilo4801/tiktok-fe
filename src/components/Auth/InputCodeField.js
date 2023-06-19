import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

InputCodeField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputCodeField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

function InputCodeField(props) {
    const { field, form, type, label, placeholder, disabled } = props;

    const { errors, touched } = form;

    const showError = errors[field.name] && touched[field.name];
    const [loadingCode, setLoadingCode] = useState(false);

    const disabledSendCode = errors['phone'] && touched['phone'];

    const handleSendCode = (e) => {
        e.preventDefault();
        setLoadingCode(true);
        setTimeout(() => {
            setLoadingCode(false);
        }, 2000);
    };
    return (
        <div className={cx('input-box')}>
            <div className={cx('code-input-box', showError ? 'invalid-field' : 'valid-field')}>
                <div className={cx('input-container')}>
                    <input {...field} type={type} disabled={disabled} placeholder={placeholder} />
                    <div className={cx('vertical-line')}></div>
                </div>
                <button
                    disabled={disabledSendCode}
                    onClick={handleSendCode}
                    className={cx('btn-send-code', disabledSendCode && 'btn-send-code-disabled')}
                >
                    Send code
                    {loadingCode && <LoadingIcon className={cx('loading-code-icon')} />}
                </button>
            </div>
            {showError && (
                <div className={cx('error-message')}>
                    <span>{errors[field.name]}</span>
                </div>
            )}
        </div>
    );
}

export default InputCodeField;
