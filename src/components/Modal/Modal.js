import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, show }) {
    return (
        <div className={cx('modal', show ? 'display-block' : 'display-none')}>
            <div className={cx('modal-container')}>
                <section className={cx('modal-main')}>{children}</section>
            </div>
        </div>
    );
}

export default Modal;
