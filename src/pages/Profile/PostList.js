import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import PostItem from './PostItem';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

PostList.propTypes = {
    data: PropTypes.array.isRequired,
};

function PostList({ data }) {
    const urlParam = useParams();
    return (
        <div className={cx('user-post-item-list')}>
            {data.map((item) => {
                return <PostItem urlParam={urlParam} item={item} key={item.id} />;
            })}
        </div>
    );
}

export default PostList;
