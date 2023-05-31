import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.defaultImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');
    const classes = cx('wrapper', {
        [className]: className,
    });

    const handleError = () => {
        setFallback(customFallback);
    };
    return <img className={classes} ref={ref} {...props} src={fallback || src} alt={alt} onError={handleError} />;
});

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
