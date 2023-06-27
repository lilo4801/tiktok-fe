import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { searchApi } from '~/services';

const cx = classNames.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    const searchInput = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResults([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const params = {
                q: debounceValue,
                type: 'less',
            };
            const result = await searchApi.search(params);

            setSearchResults(result.data);
            setLoading(false);
        };
        fetchApi();
    }, [debounceValue]);

    const handleHideResults = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClearValueInput = () => {
        setSearchValue('');
        setSearchResults([]);
        searchInput.current.focus();
    };
    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResults.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-result-body')}>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                {searchResults.map((item) => (
                                    <AccountItem key={item.id} item={item} />
                                ))}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx('search')}>
                    <input
                        ref={searchInput}
                        value={searchValue}
                        placeholder="Search"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClearValueInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
