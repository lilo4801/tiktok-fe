import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const cx = classNames.bind(styles);

function SuggestAccount({ label, items, onClickSeeMore }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {items.data.map((item, index) => (
                <Link key={index} to={`/@${item.nickname}`}>
                    <AccountItem data={item} />
                </Link>
            ))}

            {items.loading && (
                <div className={cx('account-preview-loading')}>
                    <div className={cx('avatar-loading')}></div>
                    <div className={cx('info-loading')}>
                        <div className={cx('nickname-loading')}></div>
                        <div className={cx('fullname-loading')}></div>
                    </div>
                </div>
            )}

            <button className={cx('btn-more')} onClick={() => onClickSeeMore(label)}>
                <p className={cx('extend')}>See more</p>
            </button>
        </div>
    );
}

SuggestAccount.propTypes = {
    label: PropTypes.string.isRequired,
};

export default memo(SuggestAccount);
