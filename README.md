# Word To Chemistry

Cette application permet de convertir des mots en combinaisons d'éléments chimiques.

## Fonctionnalités

- Conversion de texte en éléments chimiques
- Affichage de toutes les combinaisons possibles
- Recherche itérative de nouvelles combinaisons
- Gestion des combinaisons (réduction/suppression)

## Composants principaux

### Main.jsx
Le composant principal qui gère la logique de l'application :
- Traduction du texte en éléments chimiques
- Recherche de toutes les combinaisons possibles
- Gestion de l'état de l'application

### Components
- **InputSection**: Gère la saisie du texte et les contrôles
- **ChemicalElement**: Affiche un élément chimique
- **CombinationGroup**: Affiche un groupe de combinaisons

### Utils
- **chemUtils.js**: Contient les fonctions utilitaires pour la manipulation des éléments chimiques

## Utilisation

1. Entrez un texte dans le champ de saisie
2. Le texte est automatiquement converti en éléments chimiques
3. Options disponibles :
   - Voir toutes les combinaisons possibles
   - Rechercher de nouvelles combinaisons
   - Réduire/Étendre les groupes de combinaisons
   - Supprimer des combinaisons spécifiques

## Algorithme

L'application utilise deux approches pour trouver les combinaisons :
1. Programmation dynamique pour la traduction initiale
2. Recherche récursive pour trouver toutes les combinaisons possibles

Les éléments non trouvés sont marqués avec un "?" dans les résultats.
