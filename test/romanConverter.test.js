const { romanToArabic, arabicToRoman } = require('../server');

describe('Conversor Romano - Arábigo', () => {
    test('convierte números básicos', () => {
        expect(romanToArabic('I')).toBe(1);
        expect(romanToArabic('V')).toBe(5);
        expect(romanToArabic('X')).toBe(10);
    });

    test('convierte números compuestos', () => {
        expect(romanToArabic('MCMXCIV')).toBe(1994);
        expect(romanToArabic('MMXXIII')).toBe(2023);
    });

    test('lanza error para caracteres inválidos', () => {
        expect(() => romanToArabic('ABC')).toThrow();
        expect(() => romanToArabic('XIZ')).toThrow();
    });
});

describe('Conversor Arábigo - Romano', () => {
    test('convierte números básicos', () => {
        expect(arabicToRoman(1)).toBe('I');
        expect(arabicToRoman(5)).toBe('V');
        expect(arabicToRoman(10)).toBe('X');
    });

    test('convierte números compuestos', () => {
        expect(arabicToRoman(1994)).toBe('MCMXCIV');
        expect(arabicToRoman(2023)).toBe('MMXXIII');
    });

    test('lanza error para números fuera de rango', () => {
        expect(() => arabicToRoman(0)).toThrow();
        expect(() => arabicToRoman(4000)).toThrow();
    });
});