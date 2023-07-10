import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import { AccountIcon, EditProfileIcon, FollowedIcon, LinkShareIcon, ShareIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ShareTab from './ShareTab';
import { TYPE_SHARE_TAB } from '~/utils';
import PostList from './PostList';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ObjectUtils from '~/utils/ObjectUtils';

const cx = classNames.bind(styles);

Profile.propTypes = {};

const SHARE_TABS = [
    {
        title: 'Images',
        type: TYPE_SHARE_TAB.IMAGE_TYPE,
    },
    {
        title: 'Favorites',
        type: TYPE_SHARE_TAB.FAR_TYPE,
    },
    {
        title: 'Liked',
        type: TYPE_SHARE_TAB.LIKE_TYPE,
    },
];

const POST_ITEM_LIST = [
    {
        image: 'https://th.bing.com/th/id/OIP.dKB9IC7h56bds1GRVAcAWgHaNk?pid=ImgDet&w=185&h=338&c=7&dpr=1.4',
        views: 123,
        id: 1,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.RMKVHz920gPDF2PHMbhmBwHaKe?pid=ImgDet&w=187&h=264&c=7&dpr=1.4',
        views: 200,
        id: 2,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.2z3WlAH1yLqnswY9dF2w5gHaMc?pid=ImgDet&w=187&h=313&c=7&dpr=1.4',
        views: 1231,
        id: 3,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.wF19rFXm0SYuPG9KLSNB8QHaLH?pid=ImgDet&w=187&h=280&c=7&dpr=1.4',
        views: 441,
        id: 4,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.OFDEWWkBz0AeUHz28AClXwHaKx?pid=ImgDet&w=187&h=272&c=7&dpr=1.4',
        views: 323,
        id: 5,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.J8RGRNJz8o3zrwfI2yS9uAHaJ3?pid=ImgDet&w=187&h=249&c=7&dpr=1.4',
        views: 200,
        id: 6,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.zPggA4WtqLg2ukLKRO5IbgHaHa?pid=ImgDet&w=187&h=187&c=7&dpr=1.4',
        views: 1231,
        id: 7,
    },
    {
        image: 'https://th.bing.com/th/id/OIP.wF19rFXm0SYuPG9KLSNB8QHaLH?pid=ImgDet&w=187&h=280&c=7&dpr=1.4',
        views: 441,
        id: 8,
    },
];

function Profile() {
    const [shareTab, setShareTab] = useState(TYPE_SHARE_TAB.IMAGE_TYPE);
    const currerLogin = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParam = useParams();

    const isLogin = !ObjectUtils.isEmptyObject(currerLogin.currentUser);
    const isYourSelf = isLogin && `@${currerLogin.currentUser.nickname}` === urlParam.nickname;
    const isFollowed = true;

    useEffect(() => {
        try {
            setLoading(true);
            console.log('getitng api: ' + urlParam.nickname);
            setTimeout(() => {
                setUser({
                    username: 'lilo4801',
                    nickname: urlParam.nickname,
                    numberOfFollowers: 50,
                    numberOfLikes: 33,
                    numberOfFollowing: 339,
                    bio: 'Những thứ bạn cần',
                    shareLink: 'lypham2001.kol.eco',
                });
                setLoading(false);
            }, 2000);
        } catch (error) {}
    }, [urlParam.nickname]);
    const handleActiveTab = (value) => {
        setShareTab(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {loading ? (
                    <div>loadding</div>
                ) : (
                    <>
                        {ObjectUtils.isEmptyObject(user) ? (
                            <div className={cx('not-found-account')}>
                                <div className={cx('error-message')}>
                                    <AccountIcon />
                                    <p className={cx('title')}>Couldn't find this account</p>
                                    <p className={cx('description')}>
                                        Looking for videos? Try browsing our trending creators, hashtags, and sounds.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={cx('user-personal-information')}>
                                    <div className={cx('header-info')}>
                                        <Image alt="abc" src="abc" className={cx('user-image')} />
                                        <div className={cx('basic-info')}>
                                            <h2>{user.username}</h2>
                                            <p className={cx('nickname')}>{user.nickname}</p>
                                            {isLogin ? (
                                                isYourSelf ? (
                                                    <Button
                                                        outline
                                                        leftIcon={<FontAwesomeIcon icon={faUserEdit} />}
                                                        className={cx('edit-button')}
                                                    >
                                                        Edit profile
                                                    </Button>
                                                ) : (
                                                    <div className={cx('followed-actions')}>
                                                        {/* check follow */}
                                                        {isFollowed ? (
                                                            <>
                                                                <Button outline primaryColor>
                                                                    Messages
                                                                </Button>
                                                                <div className={cx('followed-btn')}>
                                                                    <FollowedIcon />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Button large primary>
                                                                Follow
                                                            </Button>
                                                        )}
                                                    </div>
                                                )
                                            ) : (
                                                <div className={cx('followed-actions')}>
                                                    <Button large primary>
                                                        Follow
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className={cx('share-button')}>
                                            <Button>
                                                <ShareIcon />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className={cx('interactive-numbers')}>
                                        <div className={cx('label')}>
                                            <p>
                                                <strong>{user.numberOfFollowing}</strong> <span>Following</span>
                                            </p>
                                        </div>
                                        <div className={cx('label')}>
                                            <p>
                                                <strong>{user.numberOfFollowers}</strong> <span>Followers</span>
                                            </p>
                                        </div>
                                        <div className={cx('label')}>
                                            <p>
                                                <strong>{user.numberOfLikes}</strong> <span>Likes</span>
                                            </p>
                                        </div>
                                    </h3>
                                    <div className={cx('user-bio')}>{user.bio}</div>
                                    <div className={cx('user-share-link')}>
                                        <a href="#">
                                            <LinkShareIcon />
                                            <span>{user.shareLink}</span>
                                        </a>
                                    </div>
                                </div>
                                <div className={cx('share-layout')}>
                                    <ShareTab activeTab={shareTab} onClick={handleActiveTab} data={SHARE_TABS} />
                                    <div className={cx('post-list-container')}>
                                        <PostList data={POST_ITEM_LIST} />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
