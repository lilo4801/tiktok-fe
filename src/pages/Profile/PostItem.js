import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image/Image';
import { Link } from 'react-router-dom';
import { PlayIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

PostItem.propTypes = {};

function PostItem({ item, urlParam }) {
    const { image, id, views } = item;

    return (
        <div className={cx('item-container')}>
            <div className={cx('user-post-item')}>
                <Link to={`/${urlParam.nickname}/post/${id}`}>
                    <Image alt="abc" src={image} className={cx('post-item-image')} />
                    <div className={cx('footer-item')}>
                        <PlayIcon className={cx('icon')} />
                        <strong>{views}K</strong>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PostItem;
