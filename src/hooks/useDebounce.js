import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        let timmer = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(timmer);
    }, [value]);

    return debounceValue;
}

export default useDebounce;
