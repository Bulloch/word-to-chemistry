import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputSection from '../components/InputSection';

describe('InputSection Component', () => {
    const mockProps = {
        text: '',
        score: '',
        onInputChange: jest.fn(),
        onToggleCombinations: jest.fn(),
        onFindNext: jest.fn(),
        showAllCombinations: false,
        theme: 'dark',
        onThemeToggle: jest.fn()
    };

    it('should render correctly', () => {
        render(<InputSection {...mockProps} />);
        expect(screen.getByPlaceholderText('Entrez un mot...')).toBeInTheDocument();
    });

    it('should handle input changes', () => {
        render(<InputSection {...mockProps} />);
        const input = screen.getByPlaceholderText('Entrez un mot...');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(mockProps.onInputChange).toHaveBeenCalled();
    });

    it('should show error for long input', () => {
        render(<InputSection {...mockProps} />);
        const input = screen.getByPlaceholderText('Entrez un mot...');
        fireEvent.change(input, { target: { value: 'a'.repeat(31) } });
        expect(screen.getByText('Le texte ne doit pas dépasser 30 caractères')).toBeInTheDocument();
    });

    it('should handle theme toggle', () => {
        render(<InputSection {...mockProps} />);
        const themeButton = screen.getByRole('button', { name: /Toggle theme/i });
        fireEvent.click(themeButton);
        expect(mockProps.onThemeToggle).toHaveBeenCalled();
    });

    it('should display combination controls correctly', () => {
        render(<InputSection {...mockProps} showAllCombinations={true} />);
        expect(screen.getByText('Show Best')).toBeInTheDocument();
        expect(screen.getByText('Find Next')).toBeInTheDocument();
    });

    it('should handle help modal', () => {
        render(<InputSection {...mockProps} />);
        const helpButton = screen.getByText('?');
        fireEvent.click(helpButton);
        expect(screen.getByText('Comment utiliser Word To Chemistry')).toBeInTheDocument();
    });
});
