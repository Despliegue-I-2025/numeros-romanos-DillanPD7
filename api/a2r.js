const { arabicToRoman } = require('./romanUtils');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const arabicNumber = parseInt(req.query.arabic, 10);
  
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro arabic requerido.' });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.json({ roman: romanNumeral });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};