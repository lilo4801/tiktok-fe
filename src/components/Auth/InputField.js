import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';

const cx = classNames.bind(styles);

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};
function InputField(props) {
    const { field, form, type, label, placeholder, disabled } = props;

    const { errors, touched } = form;

    const showError = errors[field.name] && touched[field.name];

    return (
        <div className={cx('input-box')}>
            <div className={cx('field-input-box', showError ? 'invalid-field' : 'valid-field')}>
                <div className={cx('input-container')}>
                    <input {...field} type={type} disabled={disabled} placeholder={placeholder} />
                </div>
            </div>
            {showError && (
                <div className={cx('error-message')}>
                    <span>{errors[field.name]}</span>
                </div>
            )}
        </div>
    );
}

export default InputField;
