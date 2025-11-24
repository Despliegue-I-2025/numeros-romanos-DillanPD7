Conversor Números Arábigos <--> Romanos

🚀 Sitio en Vivo: https://numeros-romanos-dillan-pd-7.vercel.app/

✨ Características
🎨 Diseño Espectacular: Interfaz con temática romana moderna y modo oscuro/claro

🔄 Conversión Bidireccional: Convierte fácilmente entre arábigo y romano

📊 Historial Inteligente: Guarda tus últimas conversiones automáticamente

🧠 Educativo: Pop-ups informativos con historia y reglas de numeración romana

📱 Totalmente Responsive: Funciona perfecto en desktop, tablet y móvil

🧪 Tests Completos: 6 tests unitarios garantizando calidad del código

⚡ Rendimiento Optimizado: Carga rápida y experiencia fluida

🚀 Instalación Local
bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/numeros-romanos-DillanPD7.git

# Navegar al directorio
cd numeros-romanos-DillanPD7

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Ejecutar tests
npm test
La aplicación estará disponible en: http://localhost:3000

🛠️ Tecnologías
Frontend:

HTML 
CSS
JavaScript 
Diseño Responsive

Backend:

Node.js

REST API

Testing & Calidad:

Jest (Testing Framework)

6 Tests Unitarios

Cobertura de código

Deployment:

Vercel (Plataforma de despliegue)

GitHub

📝 Uso
Conversión Básica:
Arábigo a Romano: Ingresa un número (1-3999) y haz clic en "Convertir a Romano"

Romano a Arábigo: Escribe un número romano y haz clic en "Convertir a Arábigo"

Endpoints API:
javascript
// Arábigo a Romano
GET /a2r?arabic=1994
// Response: {"roman": "MCMXCIV"}

// Romano a Arábigo  
GET /r2a?roman=MCMXCIV
// Response: {"arabic": 1994}
Historial:
Las conversiones se guardan automáticamente

Máximo 10 conversiones en el historial

Posibilidad de limpiar el historial

🎓 Reglas de Números Romanos
Tabla de Símbolos:
Símbolo	Valor
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Reglas básicas:
Suma: Símbolos iguales o decrecientes se suman → VI = 6
Resta: Símbolo menor antes de mayor se resta → IV = 4
Repetición: I, X, C, M se repiten máximo 3 veces → III = 3
Sustracción válida:

I solo puede restar a V y X

X solo puede restar a L y C

C solo puede restar a D y M

Ejemplos:
MCMXCIV = 1994

MMXXIV = 2024

CDXLIV = 444

MMMDCCCLXXXVIII = 3888

📂 Estructura del Proyecto

numeros-romanos-DillanPD7/
├── 📁 api/                    # Endpoints serverless
├── 📁 coverage/               # Reportes de cobertura de tests
├── 📁 node_modules/           # Dependencias de Node.js
├── 📁 test/                   # Archivos de testing adicionales
└── 📄 romanConverter.test.js  # Suite de tests unitarios
├── 📄 index.html              # Interfaz principal
├── 📄 styles.css              # Estilos y diseño responsive
├── 📄 script.js               # Lógica del frontend y componentes
├── 📄 server.js               # Servidor Express y endpoints API
├── 📄 package.json            # Dependencias y scripts
├── 📄 package-lock.json       # Lock de dependencias
├── 📄 vercel.json             # Configuración de despliegue
└── 📄 README.md              # Documentación
Arquitectura:
Frontend: Aplicación web estática con HTML, CSS y JavaScript

Backend: API REST con Node.js y Express

Testing: Suite completa con Jest para garantizar calidad

Deployment: Configuración optimizada para Vercel

👤 Autor
Dillan Perez Diaz
Estudiante de la Universidad Provincial de Córdoba Sede Capilla del Monte
Proyecto Realizado en la Materia: Diseños y Arquitecturas de Despliegues I

