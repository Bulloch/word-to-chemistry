import React from 'react';

const ChemicalElement = ({ element }) => (
    <div className="elements-liste">
        <h3>Numero atomique : {element.Numero_atomique}</h3>
        <h3>Nom : {element.Nom}</h3>
        <h3>Symbole chimique : {element.Symbole_chimique}</h3>
    </div>
);

export default ChemicalElement;
