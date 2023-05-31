import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function AccountItem({ item }) {
    return (
        <Link to={`/@${item.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={item.avatar} alt={item.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{item.full_name}</span>
                    {item.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{item.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default AccountItem;
