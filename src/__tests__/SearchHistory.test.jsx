import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchHistory from '../components/SearchHistory';

describe('SearchHistory Component', () => {
    const mockHistory = ['test1', 'test2', 'test3'];
    const mockOnSelect = jest.fn();
    const mockOnClear = jest.fn();
    const mockOnDelete = jest.fn();

    it('should render nothing when history is empty', () => {
        const { container } = render(
            <SearchHistory 
                history={[]} 
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render history items correctly', () => {
        render(
            <SearchHistory 
                history={mockHistory}
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        
        mockHistory.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it('should handle item selection', () => {
        render(
            <SearchHistory 
                history={mockHistory}
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        
        fireEvent.click(screen.getByText(mockHistory[0]));
        expect(mockOnSelect).toHaveBeenCalledWith(mockHistory[0]);
    });

    it('should handle clear all', () => {
        render(
            <SearchHistory 
                history={mockHistory}
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        
        fireEvent.click(screen.getByTitle('Effacer tout l\'historique'));
        expect(mockOnClear).toHaveBeenCalled();
    });

    it('should handle item deletion', () => {
        render(
            <SearchHistory 
                history={mockHistory}
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        
        const deleteButtons = screen.getAllByTitle('Supprimer');
        fireEvent.click(deleteButtons[0]);
        expect(mockOnDelete).toHaveBeenCalledWith(0);
    });

    it('should toggle collapse state', () => {
        render(
            <SearchHistory 
                history={mockHistory}
                onSelect={mockOnSelect}
                onClear={mockOnClear}
                onDelete={mockOnDelete}
            />
        );
        
        const collapseButton = screen.getByTitle('Réduire');
        fireEvent.click(collapseButton);
        expect(collapseButton).toHaveAttribute('title', 'Développer');
    });
});
