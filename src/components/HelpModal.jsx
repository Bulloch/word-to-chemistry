import React from 'react';

const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Comment utiliser Word To Chemistry</h2>
                <div className="help-content">
                    <h3>Fonctionnement de base</h3>
                    <ol>
                        <li>Entrez un mot ou une phrase dans la zone de texte</li>
                        <li>L'application convertit automatiquement le texte en éléments chimiques</li>
                        <li>Les éléments non trouvés sont marqués avec "?"</li>
                    </ol>

                    <h3>Boutons disponibles</h3>
                    <ul>
                        <li><strong>Show All/Show Best</strong> - Affiche toutes les combinaisons possibles ou seulement la meilleure</li>
                        <li><strong>Find Next</strong> - Recherche d'autres combinaisons possibles</li>
                    </ul>

                    <h3>Gestion des combinaisons</h3>
                    <ul>
                        <li>Cliquez sur une combinaison pour la réduire/développer</li>
                        <li>Utilisez le bouton ✕ pour supprimer une combinaison</li>
                    </ul>
                </div>
                <button className="modal-close" onClick={onClose}>Fermer</button>
            </div>
        </div>
    );
};

export default HelpModal;
