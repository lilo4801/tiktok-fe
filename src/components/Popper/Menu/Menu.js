import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Menu({ items = [], children, ...passProps }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                />
            );
        });
    };

    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 800]}
            offset={[12, 8]}
            hideOnClick={false}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header onBack={handleBackMenu} title={current.title} />}
                        <div className={cx('body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.node,
};

export default Menu;
