import React, { useState } from 'react';

const SearchHistory = ({ history, onSelect, onClear, onDelete }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!history.length) return null;

    return (
        <div className="search-history">
            <div className="history-header">
                <h3>Recherches récentes</h3>
                <div className="history-controls">
                    <button 
                        className="history-clear" 
                        onClick={onClear}
                        title="Effacer tout l'historique"
                    >
                        🗑️
                    </button>
                    <button 
                        className={`history-collapse ${isCollapsed ? 'collapsed' : ''}`}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Développer" : "Réduire"}
                    >
                        ▼
                    </button>
                </div>
            </div>
            <div className={`history-content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="history-items">
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                            <span onClick={() => onSelect(item)}>
                                {item}
                            </span>
                            <button 
                                className="history-item-delete"
                                onClick={() => onDelete(index)}
                                title="Supprimer"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchHistory;
