import config from '~/config';
import { Menu, MenuItem } from './Menu';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from '~/components/Icons';
import SuggestAccount from '~/components/SuggestAccount/SuggestAccount';

const cx = classNames.bind(styles);

const SUGGESTED_ACCOUNTS = 'Suggest Accounts';
const FOLLOWING_ACCOUNTS = 'Following Accounts';
const FOR_YOUR = 'For your';
const FOLLOWING = 'Following';
const LIVE = 'LIVE';

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Menu>
                    <MenuItem
                        title={FOR_YOUR}
                        to={config.routes.home}
                        leftIcon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title={FOLLOWING}
                        to={config.routes.following}
                        leftIcon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title={LIVE}
                        to={config.routes.live}
                        leftIcon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>
                <SuggestAccount label={SUGGESTED_ACCOUNTS} url="suggested-accounts" />
                <SuggestAccount label={FOLLOWING_ACCOUNTS} url="following-accounts" />
            </div>
        </div>
    );
}

export default SideBar;
