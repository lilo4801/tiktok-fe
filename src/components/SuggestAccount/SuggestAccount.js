import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestAccount({ label, url }) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    useEffect(() => {
        // call api

        setTimeout(() => {
            if (url === 'following-accounts') {
                setResults([
                    {
                        image: '',
                        nickname: 'quoc.nguyentran',
                        fullname: 'Quoc Nguyen Tran',
                        tick: true,
                        statusRelationship: true, // true for followng overwise
                    },
                    {
                        image: '',
                        nickname: 'huynh.ngan',
                        fullname: 'Huynh Nguyen Ngan',
                        tick: false,
                        statusRelationship: true,
                    },
                ]);
            } else {
                setResults([
                    {
                        image: '',
                        nickname: 'quoc.nguyentran',
                        fullname: 'Quoc Nguyen Tran',
                        tick: true,
                        statusRelationship: false, // true for followng overwise
                    },
                    {
                        image: '',
                        nickname: 'huynh.ngan',
                        fullname: 'Huynh Nguyen Ngan',
                        tick: false,
                        statusRelationship: false,
                    },
                ]);
            }

            setLoading(false);
        }, 2000);
        return () => {};
    }, []);

    const handleClickShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setResults((prev) => [...prev, ...prev]);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {results.map((item, index) => (
                <Link key={index} to={`/@${item.nickname}`}>
                    <AccountItem data={item} />
                </Link>
            ))}

            {loading && (
                <div className={cx('account-preview-loading')}>
                    <div className={cx('avatar-loading')}></div>
                    <div className={cx('info-loading')}>
                        <div className={cx('nickname-loading')}></div>
                        <div className={cx('fullname-loading')}></div>
                    </div>
                </div>
            )}

            <button className={cx('btn-more')} onClick={handleClickShowMore}>
                <p className={cx('extend')}>See more</p>
            </button>
        </div>
    );
}

SuggestAccount.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestAccount;
