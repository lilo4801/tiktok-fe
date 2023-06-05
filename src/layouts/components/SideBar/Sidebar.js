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

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For your"
                    to={config.routes.home}
                    leftIcon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    leftIcon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    leftIcon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>
        </div>
    );
}

export default SideBar;
