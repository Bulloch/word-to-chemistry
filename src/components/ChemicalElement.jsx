import React from 'react';

const ChemicalElement = ({ element }) => {
    const capitalizeSymbol = (symbol) => {
        if (symbol === "?") return symbol;
        return symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
    };

    return (
        <div className="chemical-card">
            <span className="atomic-number">{element.Numero_atomique}</span>
            <span className="chemical-symbol">{capitalizeSymbol(element.Symbole_chimique)}</span>
            <span className="element-name">{element.Nom}</span>
        </div>
    );
};

export default ChemicalElement;
