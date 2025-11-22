const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// SERVIR ARCHIVOS ESTÁTICOS CORRECTAMENTE
app.use(express.static(__dirname));

// Middleware para CORS y JSON
app.use(express.json());
app.use(express.static('.')); // Servir archivos estáticos

// Romanos a Arábigos - ENDPOINT: /r2a
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parámetro roman requerido.' });
  }

  try {
    const arabicNumber = romanToArabic(romanNumeral);
    return res.json({ arabic: arabicNumber });
  } catch (error) {
    return res.status(400).json({ error: 'Número romano inválido.' });
  }
});

// Arábigos a Romanos - ENDPOINT: /a2r
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro arabic requerido.' });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.json({ roman: romanNumeral });
  } catch (error) {
    return res.status(400).json({ error: 'Número arábigo inválido.' });
  }
});

// Funciones de conversión (las mismas que tenías)
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

// Solo iniciar servidor si es el archivo principal
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor conversor romano escuchando en puerto ${PORT}`);
    console.log(`📊 Endpoints disponibles:`);
    console.log(`   GET /a2r?arabic=123 → Convierte arábigo a romano`);
    console.log(`   GET /r2a?roman=XIV → Convierte romano a arábigo`);
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
  });
}

module.exports = { app, romanToArabic, arabicToRoman };