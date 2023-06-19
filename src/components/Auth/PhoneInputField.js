import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import { DropdownIcon, SearchIcon } from '../Icons';

const PHONE_COUNTRY_LIST = [
    'Afghanistan +93',
    'Åland Islands +35818',
    'American Samoa +1684',
    'Algeria +213',
    'Angola +244',
    'Anguilla +1264',
    'VN +84',
    'Albania +355',
    'Algeria +213',
    'American Samoa +1684',
    'Andorra +376',
    'Angola +244',
    'Anguilla +1264',
    'Antigua & Barbuda +1268',
    'Argentina +54',
    'Armenia +374',
    'Aruba +297',
    'Ascension Island +247',
    'Australia +61',
    'Austria +43',
    'Azerbaijan +994',
    'Bahamas +1242',
    'Bahrain +973',
    'Bangladesh +880',
    'Barbados +1246',
    'Barbuda +1268',
    'Belarus +375',
    'Belgium +32',
    'Belize +501',
    'Benin +229',
    'Bermuda +1441',
    'Bhutan +975',
    'Bolivia +591',
    'Botswana +267',
];

const cx = classNames.bind(styles);

PhoneInputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PhoneInputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
};

function PhoneInputField(props) {
    const [showPhoneCountryList, setShowPhoneCountryList] = useState(false);
    const [phoneCountryCode, setPhoneCountryCode] = useState('VN +84');

    const { field, form, type, label, placeholder, disabled } = props;

    const { errors, touched } = form;

    const showError = errors[field.name] && touched[field.name];

    return (
        <div className={cx('input-box')}>
            <div className={cx('phone-input-box', showError ? 'invalid-field' : 'valid-field')}>
                <Tippy
                    interactive
                    placement="bottom"
                    onHide={() => {
                        setShowPhoneCountryList(false);
                    }}
                    trigger="click"
                    offset={[115, 8]}
                    render={(attrs) => (
                        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                            <PopperWrapper className={cx('menu-popper')}>
                                <div className={cx('search-phone-country-container')}>
                                    <div className={cx('search-icon')}>
                                        <SearchIcon />
                                    </div>
                                    <input placeholder="Search" className={cx('input-search')} />
                                </div>
                                <div className={cx('phone-country-list')}>
                                    {PHONE_COUNTRY_LIST.map((item, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setPhoneCountryCode(item);
                                                }}
                                                key={index}
                                                className={cx('phone-country-item')}
                                            >
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div
                        className={cx('selection-container')}
                        onClick={() => {
                            setShowPhoneCountryList(true);
                        }}
                    >
                        <div className={cx('selection')}>
                            <span>{phoneCountryCode}</span>
                            <DropdownIcon
                                className={cx('icon-dropdown', showPhoneCountryList && 'icon-dropdown-rotate')}
                            />
                        </div>
                    </div>
                </Tippy>

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

export default PhoneInputField;
