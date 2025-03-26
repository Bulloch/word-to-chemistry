import React, { Component } from 'react';
import CombinationGroup from './components/CombinationGroup';
import InputSection from './components/InputSection';
import ChemicalElement from './components/ChemicalElement';
import { initializeElements } from './utils/chemUtils';

const chems = initializeElements();

class Main extends Component {
    chemsProperty = {
        "NUMERO_ATOMIQUE": 0,
        "NOM": 1,
        "SYMBOLE_CHIMIQUE": 2
    }
    constructor(props) {
        super(props);
        this.state = {
            textToTranslate : "",
            listNumber: "",
            listChems: [],
            showAllCombinations: false,
            allCombinations: [],
            collapsedStates: {}, // nouvel état pour suivre les combinaisons réduites
            excludedCombinations: [], // Pour stocker les combinaisons à exclure
            theme: localStorage.getItem('theme') || 'dark'
        };
    }

    componentDidMount() {
        chems.forEach(chem => {
            chem.Symbole_chimique = chem.Symbole_chimique.toLowerCase()
        })
        document.body.className = this.state.theme;
        // Appliquer le thème initial à l'App
        document.querySelector('.App').className = `App ${this.state.theme}`;
    }

    combinationToString = (combination) => {
        return JSON.stringify(combination.map(elem => elem.Symbole_chimique));
    };

    deleteCombo = (index) => {
        this.setState(prevState => ({
            allCombinations: prevState.allCombinations.filter((_, i) => i !== index)
        }));
    }

    toggleTheme = () => {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setState({ theme: newTheme });
        localStorage.setItem('theme', newTheme);
        document.querySelector('.App').className = `App ${newTheme}`;
    }

    render() {
        return(
            <div id="main-body" className={this.state.theme}>
                <InputSection 
                    text={this.state.textToTranslate}
                    onInputChange={this.handleInputChange}
                    onToggleCombinations={this.toggleCombinations}
                    onFindNext={this.findNextCombination}
                    showAllCombinations={this.state.showAllCombinations}
                    theme={this.state.theme}
                    onThemeToggle={this.toggleTheme}
                />
                {this.state.showAllCombinations ? (
                    this.state.allCombinations.map((combination, index) => (
                        <CombinationGroup
                            key={index}
                            combination={combination}
                            index={index}
                            isCollapsed={this.state.collapsedStates[index]}
                            onToggle={this.toggleCollapse}
                            onDelete={this.deleteCombo}
                        />
                    ))
                ) : (
                    this.state.listChems.map((elem, index) => (
                        <ChemicalElement
                            key={index}
                            element={elem}
                        />
                    ))
                )}
            </div>
        );
    }

    toggleCombinations = () => {
        if (!this.state.showAllCombinations) {
            const allCombos = this.findAllCombinations(this.state.textToTranslate);
            this.setState({
                showAllCombinations: true,
                allCombinations: allCombos
            });
        } else {
            this.setState({
                showAllCombinations: false
            });
        }
    }

    toggleCollapse = (index) => {
        this.setState(prevState => ({
            collapsedStates: {
                ...prevState.collapsedStates,
                [index]: !prevState.collapsedStates[index]
            }
        }));
    }

    findAllCombinations = (text) => {
        text = text.toLowerCase();
        const results = [];
        const seenCombinations = new Set();
        
        const findCombos = (startIndex, currentCombo) => {
            if (startIndex >= text.length) {
                if (currentCombo.length > 0) {
                    const comboString = this.combinationToString(currentCombo);
                    if (!seenCombinations.has(comboString)) {
                        seenCombinations.add(comboString);
                        results.push([...currentCombo]);
                    }
                }
                return;
            }

            // Essayer deux caractères d'abord (priorité aux symboles à 2 lettres)
            const twoChars = text.slice(startIndex, startIndex + 2);
            const twoCharsMatch = chems.find(item => 
                item.Symbole_chimique.toLowerCase() === twoChars.toLowerCase()
            );

            if (twoCharsMatch) {
                currentCombo.push(twoCharsMatch);
                findCombos(startIndex + 2, currentCombo);
                currentCombo.pop();
            }

            // Puis essayer un caractère
            const oneChar = text[startIndex];
            const oneCharMatch = chems.find(item => 
                item.Symbole_chimique.toLowerCase() === oneChar.toLowerCase()
            );

            if (oneCharMatch) {
                currentCombo.push(oneCharMatch);
                findCombos(startIndex + 1, currentCombo);
                currentCombo.pop();
            }

            // Si aucune correspondance, ajouter un ? et continuer
            if (!oneCharMatch && !twoCharsMatch) {
                currentCombo.push({
                    Numero_atomique: "?",
                    Nom: "?",
                    Symbole_chimique: "?"
                });
                findCombos(startIndex + 1, currentCombo);
                currentCombo.pop();
            }
        };

        findCombos(0, []);
        return results;
    }

    findNextCombination = () => {
        const text = this.state.textToTranslate;
        if (!text) return;

        const results = [];
        const seenCombos = new Set(
            this.state.allCombinations.map(combo => this.combinationToString(combo))
        );

        const findCombos = (startIndex, currentCombo, usedPositions) => {
            if (startIndex >= text.length) {
                if (currentCombo.length > 0) {
                    const comboString = this.combinationToString(currentCombo);
                    if (!seenCombos.has(comboString)) {
                        results.push([...currentCombo]);
                        return true;
                    }
                }
                return false;
            }

            // Essayer toutes les possibilités à partir de cette position
            for (let endPos = startIndex + 1; endPos <= Math.min(text.length, startIndex + 2); endPos++) {
                const substr = text.slice(startIndex, endPos + 1);
                const match = chems.find(item => 
                    item.Symbole_chimique.toLowerCase() === substr.toLowerCase()
                );

                if (match) {
                    const newUsedPositions = new Set([...usedPositions]);
                    let canUse = true;
                    
                    // Vérifier si les positions sont déjà utilisées
                    for (let i = startIndex; i <= endPos; i++) {
                        if (newUsedPositions.has(i)) {
                            canUse = false;
                            break;
                        }
                    }

                    if (canUse) {
                        // Marquer les positions comme utilisées
                        for (let i = startIndex; i <= endPos; i++) {
                            newUsedPositions.add(i);
                        }

                        currentCombo.push(match);
                        
                        // Chercher la prochaine position non utilisée
                        let nextPos = endPos + 1;
                        while (nextPos < text.length && newUsedPositions.has(nextPos)) {
                            nextPos++;
                        }

                        if (findCombos(nextPos, currentCombo, newUsedPositions)) {
                            return true;
                        }
                        currentCombo.pop();
                    }
                }
            }

            // Si aucune correspondance n'est trouvée à cette position
            if (!results.length && startIndex < text.length) {
                const newUsedPositions = new Set([...usedPositions, startIndex]);
                currentCombo.push({
                    Numero_atomique: "?",
                    Nom: "?",
                    Symbole_chimique: "?"
                });
                findCombos(startIndex + 1, currentCombo, newUsedPositions);
                currentCombo.pop();
            }

            return false;
        };

        findCombos(0, [], new Set());

        if (results.length > 0) {
            this.setState(prevState => ({
                allCombinations: [...prevState.allCombinations, ...results],
                showAllCombinations: true
            }));
        }
    };

    translate = (tempTxt) => {
        if (tempTxt === "") {
            this.setState({
                listNumber: "Empty starting string"
            });
            return 0;
        }
        const result = this.processText(tempTxt);
        let trueResult = result.map(item => item.Numero_atomique).join('');
        
        this.setState({
            listNumber: trueResult,
            listChems: result
        });
    }

    handleInputChange = (event) => {
        let tempTxt = event.target.value;
        this.setState({
            textToTranslate: tempTxt
        });
        if (tempTxt === "") {
            this.setState({
                listNumber: "Empty starting string"
            });
            return 0;
        }
        const result = this.processText(tempTxt);
        let trueResult = result.map(item => item.Numero_atomique).join('');
        
        this.setState({
            listNumber: trueResult,
            listChems: result
        });
    }

    processText = (tempTxt) => {
        tempTxt = tempTxt.toLowerCase();
        const n = tempTxt.length;
        // dp[i] stockera la meilleure combinaison jusqu'à la position i
        const dp = Array(n + 1).fill(null);
        dp[0] = { elements: [], score: 0 };

        for (let i = 1; i <= n; i++) {
            // Essayer un caractère
            const oneChar = tempTxt.slice(i - 1, i);
            const oneCharMatch = chems.find(item => 
                item.Symbole_chimique.toLowerCase() === oneChar
            );

            // Essayer deux caractères si possible
            const twoChars = i > 1 ? tempTxt.slice(i - 2, i) : '';
            const twoCharsMatch = chems.find(item => 
                item.Symbole_chimique.toLowerCase() === twoChars
            );

            // Évaluer les options et choisir la meilleure
            if (oneCharMatch && dp[i-1]) {
                const oneCharOption = {
                    elements: [...dp[i-1].elements, oneCharMatch],
                    score: dp[i-1].score + 1
                };

                dp[i] = oneCharOption;
            }

            if (twoCharsMatch && dp[i-2]) {
                const twoCharsOption = {
                    elements: [...dp[i-2].elements, twoCharsMatch],
                    score: dp[i-2].score + 2
                };

                if (!dp[i] || twoCharsOption.score > dp[i].score) {
                    dp[i] = twoCharsOption;
                }
            }

            // Si aucune correspondance n'est trouvée
            if (!dp[i] && dp[i-1]) {
                dp[i] = {
                    elements: [...dp[i-1].elements, {
                        Numero_atomique: "?",
                        Nom: "?",
                        Symbole_chimique: "?"
                    }],
                    score: dp[i-1].score
                };
            }
        }

        // Retourner la meilleure combinaison trouvée
        return dp[n] ? dp[n].elements : [];
    }

}

export default Main;
