import { useState } from 'react';

function Home() {
    const [value, setValue] = useState({
        username: 'user',
    });
    return (
        <div>
            <button
                onClick={() => {
                    value.username = 'user123';
                    setValue(value);
                }}
            >
                Click
            </button>
            <h2>Home page</h2>
            {value.username}
        </div>
    );
}

export default Home;
