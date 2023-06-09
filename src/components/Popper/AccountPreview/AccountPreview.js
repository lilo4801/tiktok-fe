import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import { TickIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AccountPreview({ data, children }) {
    return (
        <div>
            <Tippy
                interactive
                placement="bottom"
                delay={[1000, 0]}
                hideOnClick={false}
                render={(attrs) => (
                    <div className={cx('account-detail')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('preview')}>
                            <header className={cx('header')}>
                                <span className={cx('circle-avatar')}>
                                    <Image className={cx('avatar')} src="aaa" />
                                </span>
                                {data.statusRelationship ? (
                                    <Button text outline>
                                        Following
                                    </Button>
                                ) : (
                                    <Button primaryColor outline>
                                        Follow
                                    </Button>
                                )}
                            </header>
                            <div>
                                <div className={cx('name')}>
                                    <p className={cx('nickname')}>
                                        <strong>{data.nickname}</strong>
                                        {data.tick && <TickIcon className={cx('check')} />}
                                    </p>
                                    <p className={cx('fullname')}>{data.fullname}</p>
                                </div>
                                <p className={cx('operations')}>
                                    <span className={cx('number-followers')}>84.1K</span>
                                    <span className={cx('title-followers')}>Followers</span>
                                    <span className={cx('number-likes')}>1.4M</span>
                                    <span className={cx('title-likes')}>Likes</span>
                                </p>
                            </div>
                            <div className={cx('description')}>
                                Link đồ tui dùng ở đây hết nha👇🏻 Inbox for job🌸Link đồ tui dùng ở đây hết nha👇🏻 Inbox
                                for job🌸Link đồ tui dùng ở đây hết nha👇🏻 Inbox for job🌸Link đồ tui dùng ở đây hết
                                nha👇🏻 Inbox for job🌸
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default AccountPreview;
