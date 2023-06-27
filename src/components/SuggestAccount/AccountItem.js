import classNames from 'classnames/bind';
import styles from './SuggestAccount.module.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import { TickIcon } from '../Icons';
import AccountPreview from '../Popper/AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    let Component = 'div';
    if (!data.statusRelationship) {
        Component = AccountPreview;
    }

    return (
        <Component data={data}>
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.image} alt="avatar" />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <TickIcon className={cx('check')} />}
                    </p>
                    <p className={cx('fullname')}>{data.fullname}</p>
                </div>
            </div>
        </Component>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
