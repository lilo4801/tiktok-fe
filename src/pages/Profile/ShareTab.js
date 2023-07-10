import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { TYPE_SHARE_TAB } from '~/utils';
ShareTab.propTypes = {};
const cx = classNames.bind(styles);

function ShareTab({ data, onClick, activeTab }) {
    const bottomLine = useRef();

    const handleBottomLine = (value) => {
        if (value === TYPE_SHARE_TAB.IMAGE_TYPE) {
            bottomLine.current.style = 'transform: translateX(0px);';
        } else if (value === TYPE_SHARE_TAB.FAR_TYPE) {
            bottomLine.current.style = 'transform: translateX(120px);';
        } else if (value === TYPE_SHARE_TAB.LIKE_TYPE) {
            bottomLine.current.style = 'transform: translateX(240px);';
        }
    };

    return (
        <div className={cx('action-types')}>
            {data.map((item, index) => {
                return (
                    <p
                        key={index}
                        onClick={() => onClick(item.type)}
                        onMouseOver={() => handleBottomLine(item.type)}
                        onMouseOut={() => handleBottomLine(activeTab)}
                        className={cx('item-type')}
                        style={item.type === activeTab ? { color: 'rgb(22, 24, 35)' } : {}}
                    >
                        <span>{item.title}</span>
                    </p>
                );
            })}
            <div ref={bottomLine} className={cx('bottom-line')}></div>
        </div>
    );
}

export default ShareTab;
