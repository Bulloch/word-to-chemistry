const chems = require("../elements_chimiques.json");

export const combinationToString = (combination) => {
    return JSON.stringify(combination.map(elem => elem.Symbole_chimique));
};

export const findElementMatches = (text, position) => {
    const oneChar = text[position];
    const twoChars = text.slice(position, position + 2);

    return {
        oneCharMatch: chems.find(item => 
            item.Symbole_chimique.toLowerCase() === oneChar.toLowerCase()
        ),
        twoCharsMatch: chems.find(item => 
            item.Symbole_chimique.toLowerCase() === twoChars.toLowerCase()
        )
    };
};

export const createUnknownElement = () => ({
    Numero_atomique: "?",
    Nom: "?",
    Symbole_chimique: "?"
});

// Initialise les symboles chimiques en minuscules
export const initializeElements = () => {
    chems.forEach(chem => {
        chem.Symbole_chimique = chem.Symbole_chimique.toLowerCase()
    });
    return chems;
};
