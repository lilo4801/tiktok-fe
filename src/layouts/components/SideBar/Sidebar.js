import config from '~/config';
import { Menu } from './Menu';
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
import { useCallback, useEffect, useMemo, useState } from 'react';

const cx = classNames.bind(styles);

const SUGGESTED_ACCOUNTS = 'Suggest Accounts';
const FOLLOWING_ACCOUNTS = 'Following Accounts';
const FOR_YOUR = 'For your';
const FOLLOWING = 'Following';
const LIVE = 'LIVE';

function SideBar() {
    const [followingAccounts, setFollowingAccounts] = useState({
        loading: true,
        data: [],
    });
    const [suggestedAccounts, setSuggestedAccounts] = useState({
        loading: true,
        data: [],
    });
    useEffect(() => {
        const timeId1 = setTimeout(() => {
            const data1 = [
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
            ];
            setFollowingAccounts((prev) => {
                return {
                    ...prev,
                    data: data1,
                    loading: false,
                };
            });
        }, 2000);

        const timeId2 = setTimeout(() => {
            const data2 = [
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
            ];

            setSuggestedAccounts((prev) => {
                return {
                    ...prev,
                    data: data2,
                    loading: false,
                };
            });
        }, 2000);
        return () => {
            clearTimeout(timeId1);
            clearTimeout(timeId2);
        };
    }, []);
    const handleClickShowMore = useCallback((label) => {
        if (label === FOLLOWING_ACCOUNTS) {
            setFollowingAccounts((prev) => {
                return {
                    ...prev,
                    loading: true,
                };
            });
            setTimeout(() => {
                setFollowingAccounts((prev) => {
                    return {
                        ...prev,
                        data: [...prev.data, ...prev.data],
                        loading: false,
                    };
                });
            }, 2000);
        } else if (label === SUGGESTED_ACCOUNTS) {
            setSuggestedAccounts((prev) => {
                return {
                    ...prev,
                    loading: true,
                };
            });
            setTimeout(() => {
                setSuggestedAccounts((prev) => {
                    return {
                        ...prev,
                        data: [...prev.data, ...prev.data],
                        loading: false,
                    };
                });
            }, 2000);
        }
    }, []);
    const menuItems = useMemo(() => {
        return [
            {
                title: FOR_YOUR,
                to: config.routes.home,
                leftIcon: HomeIcon,
                activeIcon: HomeActiveIcon,
            },
            {
                title: FOLLOWING,
                to: config.routes.following,
                leftIcon: UserGroupIcon,
                activeIcon: UserGroupActiveIcon,
            },
            {
                title: LIVE,
                to: config.routes.live,
                leftIcon: LiveIcon,
                activeIcon: LiveActiveIcon,
            },
        ];
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Menu data={menuItems} />
                <SuggestAccount
                    label={SUGGESTED_ACCOUNTS}
                    items={suggestedAccounts}
                    onClickSeeMore={handleClickShowMore}
                />
                <SuggestAccount
                    label={FOLLOWING_ACCOUNTS}
                    items={followingAccounts}
                    onClickSeeMore={handleClickShowMore}
                />
            </div>
        </div>
    );
}

export default SideBar;
