import React from 'react';
import ChemicalElement from './ChemicalElement';

const CombinationGroup = ({ combination, index, isCollapsed, onToggle, onDelete }) => (
    <div className="combination-group">
        <div className="combination-header" onClick={() => onToggle(index)}>
            <h2>
                <p className="combination-result">
                    {combination.map(elem => elem.Symbole_chimique).join(' ')}
                </p> - 
                <p className="combination-score">
                    {combination.map(elem => elem.Numero_atomique).join('')}
                </p>
            </h2>
            <div className="combination-controls">
                <button 
                    className="delete-combo"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                    }}
                >
                    ✕
                </button>
                <span className={`collapse-arrow ${isCollapsed ? 'collapsed' : ''}`}>
                    ▼
                </span>
            </div>
        </div>
        <div className={`combination-content ${isCollapsed ? 'collapsed' : ''}`}>
            {combination.map((elem, elemIndex) => (
                <ChemicalElement 
                    key={`${index}-${elemIndex}`}
                    element={elem}
                />
            ))}
        </div>
    </div>
);

export default CombinationGroup;
