# Word To Chemistry

Ce projet personnel éducatif permet de convertir des mots en combinaisons d'éléments chimiques du tableau périodique, développé avec l'aide de GitHub Copilot.

## Projet Personnel & Apprentissage

Ce projet a été créé dans le cadre d'un apprentissage personnel avec plusieurs objectifs :
- Approfondir ma compréhension de React et des algorithmes complexes
- Explorer l'utilisation de GitHub Copilot dans un contexte de développement réel
- Améliorer mes connaissances du tableau périodique des éléments
- Expérimenter avec différentes approches algorithmiques

## Développement assisté par GitHub Copilot

GitHub Copilot a joué un rôle crucial dans le développement de ce projet :
- Suggestions pertinentes pour les algorithmes de recherche
- Aide à la structuration du code React
- Génération de tests unitaires cohérents
- Amélioration de la documentation du code

## Description

Word To Chemistry est une application React qui permet de :
- Convertir du texte en combinaisons d'éléments chimiques
- Afficher toutes les combinaisons possibles pour un texte donné
- Visualiser les éléments chimiques avec leurs propriétés (numéro atomique, nom, symbole)
- Gérer et explorer différentes combinaisons possibles

## Fonctionnalités principales

- Conversion instantanée du texte en éléments chimiques
- Recherche intelligente de toutes les combinaisons possibles
- Interface utilisateur intuitive et réactive
- Mode d'affichage simple ou détaillé des combinaisons
- Possibilité de réduire/étendre les combinaisons
- Fonction de recherche itérative de nouvelles combinaisons
- Suppression sélective des combinaisons
- Aide contextuelle intégrée

## Structure du projet

### Components
- **Main.jsx**: Composant principal gérant la logique de l'application
- **InputSection**: Gestion de la saisie et des contrôles principaux
- **ChemicalElement**: Affichage des éléments chimiques
- **CombinationGroup**: Affichage des groupes de combinaisons
- **HelpModal**: Modal d'aide pour l'utilisateur

### Utils
- **chemUtils.js**: Fonctions utilitaires pour la manipulation des éléments chimiques
  - Recherche d'éléments
  - Conversion des combinaisons
  - Initialisation des données

### Data
- **elements_chimiques.json**: Base de données des éléments chimiques

## Algorithmes

L'application utilise deux approches principales :

1. **Programmation dynamique** (processText)
   - Optimise la première traduction du texte
   - Trouve la meilleure combinaison initiale

2. **Recherche récursive** (findAllCombinations)
   - Explore toutes les combinaisons possibles
   - Évite les doublons
   - Gère les caractères non trouvés avec "?"

## Retour d'expérience

### Apprentissage avec GitHub Copilot
- Amélioration de la productivité dans l'écriture du code
- Découverte de nouvelles approches algorithmiques
- Meilleure compréhension des patterns React
- Documentation plus complète et cohérente

### Défis personnels relevés
- Implémentation d'algorithmes complexes (programmation dynamique, recherche récursive)
- Gestion d'état React avec des données complexes
- Optimisation des performances
- Tests unitaires complets

## Installation

```bash
npm install
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Tests

```bash
npm test
```

Des tests unitaires sont disponibles pour les composants principaux et les utilitaires.

## Note Personnelle

Ce projet représente une exploration personnelle des possibilités offertes par React et GitHub Copilot dans le contexte d'une application éducative. Il reflète mon parcours d'apprentissage et peut servir d'exemple pour d'autres développeurs intéressés par l'utilisation de l'IA dans leur processus de développement.
