const { romanToArabic } = require('./romanUtils');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const romanNumeral = req.query.roman;
  
  if (!romanNumeral) {
    return res.status(400).json({ error: 'Parámetro roman requerido.' });
  }

  try {
    const arabicNumber = romanToArabic(romanNumeral);
    return res.json({ arabic: arabicNumber });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};