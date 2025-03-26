import React, { useState } from 'react';
import HelpModal from './HelpModal';

const InputSection = ({ 
    text, 
    onInputChange, 
    onToggleCombinations, 
    onFindNext, 
    showAllCombinations 
}) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <>
            <div className="input-controls">
                <input type="text" id="inputText" onChange={onInputChange}/>
                <button className="help-button" onClick={() => setIsHelpOpen(true)}>
                    ?
                </button>
            </div>
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
                        result : <p>{text}</p>
                    </h1>
                </>
            )}
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </>
    );
};

export default InputSection;
