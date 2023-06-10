import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function LoginItem({ data }) {
    return (
        <div className={cx('login-item')}>
            <div className={cx('icon-login')}>{data.icon}</div>
            <p className={cx('title-login')}>{data.title}</p>
        </div>
    );
}

export default LoginItem;
