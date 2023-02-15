import { useState } from 'react';
import NewsList from '../newsList/NewsList';

import './appHeader.scss';

const AppHeader = () => {
    const [newsName, setNewsName] = useState('');
    
    const handleSearchClick = () => {
        const inputValue = document.getElementById('newsName').value;
        setNewsName(inputValue);
    };

    return (
        <>
        <div className="app-header">
            <div className="app-header__title">
                <h1>News App</h1>
                <p>News from around the world</p>
            </div>

            <div className="app-header__search">
                <h2>What are you looking ? </h2>
                <div>
                    <input id="newsName"
                        type="text"
                        placeholder="Search news"/>
                    <button type="button" onClick={handleSearchClick}>
                        Search...
                    </button>
                </div>
            </div>
        </div>
        <NewsList newsName={newsName} />
        </>
    );
};


export default AppHeader;