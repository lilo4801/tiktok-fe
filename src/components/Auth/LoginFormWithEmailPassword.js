import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import Button from '../Button/Button';
import LoginFormWithPhoneCode from './LoginFormWithPhoneCode';
import { useState } from 'react';
import { StringUtils } from '~/utils';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

function LoginFormWithEmailPassword({ onClick }) {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showErrorInput, setShowErrorInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setShowErrorInput(true);
            setLoading(false);
        }, 2000);
    };

    return (
        <form className={cx('wrapper')}>
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
                <div className={cx('input-box')}>
                    <div className={cx('password-input-box')}>
                        <div className={cx('input-container')}>
                            <input
                                type="text"
                                value={usernameValue}
                                onChange={(e) => setUsernameValue(e.target.value)}
                                placeholder="Email or username"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('input-box')}>
                    <div className={cx('password-input-box')}>
                        <div className={cx('input-container')}>
                            <input
                                type="text"
                                value={passwordValue}
                                onChange={(e) => setPasswordValue(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    {showErrorInput && (
                        <div className={cx('error-message')}>
                            <span>Username or password doesn't match our records. Try again.</span>
                        </div>
                    )}
                </div>
                <div className={cx('description-title-password')}>
                    <Button className={cx('switch-type')} text>
                        Forgot password?
                    </Button>
                </div>
                <Button
                    disabled={StringUtils.isEmpty(usernameValue) || StringUtils.isEmpty(passwordValue)}
                    primary
                    className={cx('btn-login')}
                    onClick={handleSubmit}
                >
                    {loading ? <LoadingIcon className={cx('loading-code-icon')} /> : ' Log in'}
                </Button>
            </div>
        </form>
    );
}

export default LoginFormWithEmailPassword;
