// Funciones de conversión (copia desde tu server.js)
function romanToArabic(roman) {
  const romanToArabicMap = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  if (typeof roman !== 'string') {
    throw new Error('La entrada debe ser una cadena de texto');
  }

  if (!roman) {
    throw new Error('La cadena no puede estar vacía');
  }

  const upperRoman = roman.toUpperCase();
  
  if (!/^[IVXLCDM]+$/.test(upperRoman)) {
    throw new Error('Caracteres romanos no válidos');
  }

  let result = 0;
  let i = 0;

  while (i < upperRoman.length) {
    const currentChar = upperRoman[i];
    const currentValue = romanToArabicMap[currentChar];
    const nextChar = upperRoman[i + 1];
    const nextValue = romanToArabicMap[nextChar];

    if (nextValue && currentValue < nextValue) {
      if (!isValidSubtraction(currentChar, nextChar)) {
        throw new Error('Combinación romana no válida');
      }
      result += (nextValue - currentValue);
      i += 2;
    } else {
      result += currentValue;
      i += 1;
    }
  }

  // Validar que el número romano sea válido reconvirtiéndolo
  const revertedRoman = arabicToRoman(result);
  if (revertedRoman !== upperRoman) {
    throw new Error('Número romano no válido');
  }

  return result;
}

function arabicToRoman(arabic) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  if (typeof arabic !== 'number' || arabic <= 0 || arabic > 3999) {
    throw new Error('El número debe estar entre 1 y 3999');
  }

  if (!Number.isInteger(arabic)) {
    throw new Error('El número debe ser entero');
  }

  let result = '';
  let remaining = arabic;

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

function isValidSubtraction(smaller, larger) {
  const validSubtractions = {
    'I': ['V', 'X'],
    'X': ['L', 'C'],
    'C': ['D', 'M']
  };
  return validSubtractions[smaller] && validSubtractions[smaller].includes(larger);
}

module.exports = { romanToArabic, arabicToRoman };