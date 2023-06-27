import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import { memo } from 'react';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ data }) {
    return (
        <nav className={cx('wrapper')}>
            {data.map((item, index) => {
                const LeftIcon = item.leftIcon;
                const ActiveIcon = item.activeIcon;
                return (
                    <MenuItem
                        key={index}
                        title={item.title}
                        leftIcon={<LeftIcon />}
                        to={item.to}
                        activeIcon={<ActiveIcon />}
                    />
                );
            })}
        </nav>
    );
}

Menu.propTypes = {
    data: PropTypes.array.isRequired,
};

export default memo(Menu);
