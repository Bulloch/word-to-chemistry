import React from 'react';

const SearchHistory = ({ history, onSelect }) => {
    if (!history.length) return null;

    return (
        <div className="search-history">
            <h3>Recherches récentes</h3>
            <div className="history-items">
                {history.map((item, index) => (
                    <button
                        key={index}
                        className="history-item"
                        onClick={() => onSelect(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchHistory;
