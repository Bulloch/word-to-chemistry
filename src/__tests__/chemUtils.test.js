import { findElementMatches, combinationToString, createUnknownElement, initializeElements } from '../utils/chemUtils';

describe('chemUtils', () => {
  describe('findElementMatches', () => {
    test('should find single character element', () => {
      const result = findElementMatches('h', 0);
      expect(result.oneCharMatch).toBeTruthy();
      expect(result.oneCharMatch.Symbole_chimique).toBe('h');
    });

    test('should find two character element', () => {
      const result = findElementMatches('he', 0);
      expect(result.twoCharsMatch).toBeTruthy();
      expect(result.twoCharsMatch.Symbole_chimique).toBe('he');
    });

    test('should return null for non-existing elements', () => {
      const result = findElementMatches('xx', 0);
      expect(result.oneCharMatch).toBeUndefined();
      expect(result.twoCharsMatch).toBeUndefined();
    });
  });

  describe('combinationToString', () => {
    test('should convert combination to string', () => {
      const combination = [
        { Symbole_chimique: 'H' },
        { Symbole_chimique: 'He' }
      ];
      expect(combinationToString(combination)).toBe('["H","He"]');
    });
  });

  describe('createUnknownElement', () => {
    test('should create unknown element object', () => {
      const unknown = createUnknownElement();
      expect(unknown).toEqual({
        Numero_atomique: "?",
        Nom: "?",
        Symbole_chimique: "?"
      });
    });
  });

  describe('initializeElements', () => {
    test('should convert symbols to lowercase', () => {
      const elements = initializeElements();
      elements.forEach(element => {
        expect(element.Symbole_chimique).toBe(element.Symbole_chimique.toLowerCase());
      });
    });
  });
});
