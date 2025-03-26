import React from 'react';
import { render, screen } from '@testing-library/react';
import ChemicalElement from '../components/ChemicalElement';

describe('ChemicalElement Component', () => {
  const testElement = {
    Numero_atomique: 1,
    Nom: "Hydrogene",
    Symbole_chimique: "H"
  };

  test('renders element properties', () => {
    render(<ChemicalElement element={testElement} />);
    
    expect(screen.getByText(/Numero atomique : 1/)).toBeInTheDocument();
    expect(screen.getByText(/Nom : Hydrogene/)).toBeInTheDocument();
    expect(screen.getByText(/Symbole chimique : H/)).toBeInTheDocument();
  });

  test('renders unknown element', () => {
    const unknownElement = {
      Numero_atomique: "?",
      Nom: "?",
      Symbole_chimique: "?"
    };
    
    render(<ChemicalElement element={unknownElement} />);
    expect(screen.getAllByText(/\?/)).toHaveLength(3);
  });
});
