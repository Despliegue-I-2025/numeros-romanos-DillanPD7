const { arabicToRoman } = require('./romanUtils');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const arabicParam = req.query.arabic;
  
  // ✅ NUEVA VALIDACIÓN - Solo números
  if (!arabicParam || arabicParam.trim() === '') {
    return res.status(400).json({ error: 'Parámetro arabic requerido.' });
  }
  
  // ✅ VALIDACIÓN CLAVE: Verificar que sea SOLO números
  if (!/^\d+$/.test(arabicParam)) {
    return res.status(400).json({ error: 'El parámetro arabic debe contener solo números.' });
  }
  
  const arabicNumber = parseInt(arabicParam, 10);
  
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro arabic debe ser un número válido.' });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.json({ roman: romanNumeral });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};