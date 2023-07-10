import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUp,
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMoon,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import Menu from '~/components/Popper/Menu';
import {
    BackIcon,
    CloseIcon,
    InboxIcon,
    LoginWithAccountIcon,
    LoginWithGoogleIcon,
    LoginWithInstagramIcon,
    LoginWithLINEIcon,
    LoginWithQRCodeIcon,
    LoginWithTwitterIcon,
    MessageIcon,
    UploadIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '~/layouts/components/Search';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useState } from 'react';
import Modal from '~/components/Modal/Modal';
import LoginItem from './LoginItem';
import { LoginFormWithPhonePassword } from '~/components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { accountApi } from '~/services';
import ObjectUtils from '~/utils/ObjectUtils';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tieng Viet',
                },
                {
                    code: 'Jp',
                    title: 'Japan',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/help',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
        to: '/keyboard',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Dark mode',
    },
];

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/help',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coin',
        to: '/help',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/help',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/help',
        separate: true,
    },
];

const MENU_AUTH = {
    signin: {
        data: [
            {
                icon: <LoginWithQRCodeIcon />,
                title: 'Use QR code',
                children: {
                    data: [
                        {
                            Component: LoginFormWithPhonePassword,
                        },
                    ],
                },
            },
            {
                icon: <LoginWithAccountIcon />,
                title: 'Use phone / email / username',
                children: {
                    data: [
                        {
                            Component: LoginFormWithPhonePassword,
                        },
                    ],
                },
            },
            { icon: <LoginWithGoogleIcon />, title: 'Continue with Google' },
            { icon: <LoginWithTwitterIcon />, title: 'Continue with Twitter' },
            { icon: <LoginWithLINEIcon />, title: 'Continue with LINE' },
            { icon: <LoginWithInstagramIcon />, title: 'Continue with Instagram' },
        ],
        title: 'Log in to Tiktok',
        titleFooter: "Don't have an account?",
        button: 'Sign up',
    },
    signup: {
        title: 'Sign up for Tiktok',
        data: [
            { icon: <LoginWithAccountIcon />, title: 'Use phone / email / username' },
            { icon: <LoginWithGoogleIcon />, title: 'Continue with Google' },
            { icon: <LoginWithTwitterIcon />, title: 'Continue with Twitter' },
            { icon: <LoginWithLINEIcon />, title: 'Continue with LINE' },
            { icon: <LoginWithInstagramIcon />, title: 'Continue with Instagram' },
        ],
        titleFooter: 'Already have an account?',
        button: 'Log in',
    },
};

function Header() {
    const navigate = useNavigate();
    const [isAlreadyAccount, setIsAlreadyAccount] = useState(true);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const currentLogin = useSelector((state) => state.user);

    const isLogin = !ObjectUtils.isEmptyObject(currentLogin.currentUser);
    const loading = currentLogin.loading;
    if (isLogin) {
        USER_MENU[0].to = `/@lilo4801`;
    }

    let showMenuAuth = isAlreadyAccount ? MENU_AUTH.signin : MENU_AUTH.signup;
    const [history, setHistory] = useState([{ data: showMenuAuth.data }]);
    const current = history[history.length - 1];

    const handleShowClose = () => {
        setShowModalLogin(!showModalLogin);
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const handleMore = (data) => {
        setHistory((prev) => [...prev, data.children]);
    };

    const handleSubmitLoginForm = (values) => {
        return new Promise((resolve) => {
            const requestLogin = async () => {
                try {
                    const res = await accountApi.login(values);
                    localStorage.setItem('token', res.data.accessToken);
                    setShowModalLogin(false);
                    resolve(true);
                    navigate('home');
                } catch (error) {
                    console.log(error);
                }
            };
            requestLogin();
        });
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>
                {/* search */}
                <Search />
                <div className={cx('actions')}>
                    {isLogin ? (
                        <>
                            <Tippy content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox!" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button outline leftIcon={<FontAwesomeIcon icon={faArrowUp} />}>
                                Upload
                            </Button>
                            <Button primary onClick={handleShowClose}>
                                Log in
                            </Button>
                            <Modal show={showModalLogin}>
                                <div className={cx('modal-login')}>
                                    <h2>{showMenuAuth.title}</h2>
                                    <div className={cx('modal-login-content')}>
                                        <div className={cx('type-login-box')}>
                                            {current.data.map((item, index) => {
                                                if (!!item.Component) {
                                                    return (
                                                        <item.Component
                                                            onSubmitForm={handleSubmitLoginForm}
                                                            onClick={handleMore}
                                                            key={index}
                                                        />
                                                    );
                                                } else {
                                                    return <LoginItem onClick={handleMore} key={index} data={item} />;
                                                }
                                            })}
                                        </div>
                                    </div>
                                    {history.length <= 1 && (
                                        <div className={cx('policy-box')}>
                                            <p className={cx('login-policy')}>
                                                By continuing, you agree to TikTok’s Terms of Service and confirm that
                                                you have read TikTok’s Privacy Policy.
                                            </p>
                                        </div>
                                    )}

                                    <div className={cx('footer-modal')}>
                                        <p>{showMenuAuth.titleFooter}</p>
                                        <Button
                                            onClick={() => setIsAlreadyAccount((prev) => !prev)}
                                            className={cx('button-signup-text')}
                                            text
                                        >
                                            <p>{showMenuAuth.button}</p>
                                        </Button>
                                    </div>
                                    {history.length >= 2 && (
                                        <div onClick={handleBack} className={cx('back-btn')}>
                                            <BackIcon />
                                        </div>
                                    )}

                                    <div onClick={handleShowClose} className={cx('close-modal')}>
                                        <CloseIcon />
                                    </div>
                                </div>
                            </Modal>
                        </>
                    )}
                    {!loading && (
                        <Menu items={isLogin ? USER_MENU : MENU_ITEMS}>
                            {isLogin ? (
                                <Image
                                    className={cx('user-avatar')}
                                    alt="avatar"
                                    src="https://th.bing.com/th/id/R.1da9fc7091005b1d71a37cf5ad2fb865?rik=Pqa01c8QKJ5d3Q&riu=http%3a%2f%2fimages2.fanpop.com%2fimage%2fphotos%2f11900000%2fLuffy-one-piece-11990420-2560-2286.jpg&ehk=trmqe1sBZ7yVcQXTLfcFT4itA%2fJneElCf4em5jhG%2fJo%3d&risl=&pid=ImgRaw&r=0"
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
