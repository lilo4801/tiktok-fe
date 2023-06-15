import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import Button from '../Button/Button';
import { DropdownIcon, LoadingIcon, SearchIcon } from '../Icons';
import LoginFormWithPhonePassword from './LoginFormWithPhonePassword';
import LoginFormWithEmailPassword from './LoginFormWithEmailPassword';
import { useRef, useState } from 'react';
import { StringUtils } from '~/utils';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

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

function LoginFormWithPhoneCode({ onClick }) {
    const [showBtnSendCode, setShowBtnSendCode] = useState(false);
    const [showErrorPhoneInput, setShowErrorPhoneInput] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);
    const [showPhoneCountryList, setShowPhoneCountryList] = useState(false);
    const [phoneCountryCode, setPhoneCountryCode] = useState('VN +84');
    const inputBox = useRef();

    const handlePhoneInput = (e) => {
        if (StringUtils.isNumber(e.target.value)) {
            setShowBtnSendCode(true);
        } else {
            setShowBtnSendCode(false);
        }
    };

    const handleCheckValidInput = (e) => {
        if (StringUtils.isNumber(e.target.value)) {
            setShowErrorPhoneInput(false);
            inputBox.current.style = 'border: none;';
        } else {
            setShowErrorPhoneInput(true);
            inputBox.current.style = 'border: 1px solid rgb(255, 76, 58);';
        }
    };

    const handleSendCode = (e) => {
        e.preventDefault();
        setLoadingCode(true);
        setTimeout(() => {
            setLoadingCode(false);
            setShowErrorPhoneInput(true);
            inputBox.current.style = 'border: 1px solid rgb(255, 76, 58);';
        }, 2000);
        console.log(11);
    };

    return (
        <form className={cx('wrapper')}>
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
                <div className={cx('input-box')}>
                    <div ref={inputBox} className={cx('phone-input-box')}>
                        <Tippy
                            interactive
                            placement="bottom"
                            // hideOnClick={false}
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
                            <input
                                type="text"
                                onBlur={handleCheckValidInput}
                                onChange={handlePhoneInput}
                                placeholder="Phone number"
                            />
                        </div>
                    </div>
                    {showErrorPhoneInput && (
                        <div className={cx('error-message')}>
                            <span>Enter a valid phone number</span>
                        </div>
                    )}
                </div>
                <div className={cx('input-box')}>
                    <div className={cx('code-input-box')}>
                        <div className={cx('input-container')}>
                            <input type="text" placeholder="Enter 6-digit code" />
                            <div className={cx('vertical-line')}></div>
                        </div>
                        <button
                            disabled={!showBtnSendCode}
                            onClick={handleSendCode}
                            className={cx('btn-send-code', !showBtnSendCode && 'btn-send-code-disabled')}
                        >
                            Send code
                            {loadingCode && <LoadingIcon className={cx('loading-code-icon')} />}
                        </button>
                    </div>
                </div>
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
                <Button primary className={cx('btn-login')}>
                    Log in
                </Button>
            </div>
        </form>
    );
}

export default LoginFormWithPhoneCode;
