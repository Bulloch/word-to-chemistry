import React, { useState, useEffect } from 'react';
import HelpModal from './HelpModal';
import SearchHistory from './SearchHistory';

const InputSection = ({ 
    text, 
    score, 
    onInputChange, 
    onToggleCombinations, 
    onFindNext, 
    showAllCombinations
}) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (text) {
            setSearchHistory(prev => [...new Set([text, ...prev])].slice(0, 5));
        }
    }, [text]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length > 30) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        onInputChange(e);
    };

    const clearHistory = () => {
        setSearchHistory([]);
    };

    const deleteHistoryItem = (index) => {
        setSearchHistory(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="input-section">
            <div className="top-controls">
                <button className="help-button" onClick={() => setIsHelpOpen(true)}>
                    ?
                </button>
            </div>

            <div className="input-controls">
                <input 
                    type="text" 
                    id="inputText" 
                    onChange={handleInputChange}
                    placeholder="Entrez un mot..."
                    maxLength={30}
                />
                {showError && (
                    <div className="error-message">
                        Le texte ne doit pas dépasser 30 caractères
                    </div>
                )}
            </div>

            <SearchHistory 
                history={searchHistory} 
                onSelect={(text) => onInputChange({ target: { value: text }})}
                onClear={clearHistory}
                onDelete={deleteHistoryItem}
            />

            <button onClick={onToggleCombinations} id="more">
                {showAllCombinations ? "Show Best" : "Show All"}
            </button>
            {showAllCombinations && (
                <button onClick={onFindNext} id="next-combination">
                    Find Next
                </button>
            )}
            {text && (
                <>
                    <h1 id="entry-text" className="visible">{text}</h1>
                    <h1 id="result-score" className="visible">
                        result : <p>{score}</p>
                    </h1>
                </>
            )}
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </div>
    );
};

export default InputSection;
