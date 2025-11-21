class RomanConverter {
    static async toRoman(number) {
        try {
            const response = await fetch(`/a2r?arabic=${number}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error en la conversión');
            }
            
            return data.roman;
        } catch (error) {
            throw new Error(`Error al convertir a romano: ${error.message}`);
        }
    }

    static async fromRoman(roman) {
        try {
            const response = await fetch(`/r2a?roman=${encodeURIComponent(roman)}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error en la conversión');
            }
            
            return data.arabic;
        } catch (error) {
            throw new Error(`Error al convertir a arábigo: ${error.message}`);
        }
    }
}

// El resto del código se mantiene IGUAL (ThemeManager, HistoryManager, PopupManager)
class ThemeManager {
    static init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        document.getElementById('themeButton').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    static setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    static toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

class HistoryManager {
    static KEY = 'conversionHistory';
    
    static getHistory() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    }
    
    static addConversion(from, to, type) {
        const history = this.getHistory();
        const conversion = {
            id: Date.now(),
            from,
            to,
            type,
            timestamp: new Date().toLocaleString()
        };
        
        history.unshift(conversion);
        if (history.length > 10) history.pop();
        
        localStorage.setItem(this.KEY, JSON.stringify(history));
        this.updateDisplay();
    }
    
    static updateDisplay() {
        const historyList = document.getElementById('historyList');
        const history = this.getHistory();
        
        if (history.length === 0) {
            historyList.innerHTML = '<div class="history-item">No hay conversiones recientes</div>';
            return;
        }
        
        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <span>${item.from} → ${item.to}</span>
                <small>${item.timestamp}</small>
            </div>
        `).join('');
    }
    
    static clearHistory() {
        localStorage.removeItem(this.KEY);
        this.updateDisplay();
    }
}

class PopupManager {
    static init() {
        this.setupHelpPopup();
        this.setupHistoryPopup();
        this.setupOverlay();
    }

    static setupHelpPopup() {
        const helpBtn = document.getElementById('helpBtn');
        const helpPopup = document.getElementById('helpPopup');
        const closeHelp = document.getElementById('closeHelp');

        helpBtn.addEventListener('click', () => this.openPopup(helpPopup));
        closeHelp.addEventListener('click', () => this.closePopup(helpPopup));
    }

    static setupHistoryPopup() {
        const historyBtn = document.getElementById('historyBtn');
        const historyPopup = document.getElementById('historyPopup');
        const closeHistory = document.getElementById('closeHistory');

        historyBtn.addEventListener('click', () => this.openPopup(historyPopup));
        closeHistory.addEventListener('click', () => this.closePopup(historyPopup));
    }

    static setupOverlay() {
        document.addEventListener('click', (e) => {
            const popups = document.querySelectorAll('.popup.active');
            popups.forEach(popup => {
                if (!popup.contains(e.target) && !e.target.closest('.info-btn')) {
                    this.closePopup(popup);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const popups = document.querySelectorAll('.popup.active');
                popups.forEach(popup => this.closePopup(popup));
            }
        });
    }

    static openPopup(popup) {
        document.querySelectorAll('.popup.active').forEach(otherPopup => {
            if (otherPopup !== popup) {
                this.closePopup(otherPopup);
            }
        });

        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    static closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Funciones de conversión ACTUALIZADAS (ahora son async)
async function convertToRoman() {
    const input = document.getElementById('arabicInput');
    const resultDiv = document.getElementById('romanResult');
    const resultValue = resultDiv.querySelector('.result-value');
    
    try {
        const number = parseInt(input.value);
        
        if (isNaN(number)) {
            throw new Error('Por favor ingresa un número válido');
        }

        // MOSTRAR LOADING
        resultValue.textContent = 'Convirtiendo...';
        resultDiv.className = 'result';

        const roman = await RomanConverter.toRoman(number);
        resultValue.textContent = roman;
        resultDiv.className = 'result success';
        
        HistoryManager.addConversion(number, roman, 'arabic-to-roman');
        
    } catch (error) {
        resultValue.textContent = error.message;
        resultDiv.className = 'result error';
    }
}

async function convertToArabic() {
    const input = document.getElementById('romanInput');
    const resultDiv = document.getElementById('arabicResult');
    const resultValue = resultDiv.querySelector('.result-value');
    
    try {
        const roman = input.value.trim();
        
        if (!roman) {
            throw new Error('Por favor ingresa un número romano');
        }

        // MOSTRAR LOADING
        resultValue.textContent = 'Convirtiendo...';
        resultDiv.className = 'result';

        const number = await RomanConverter.fromRoman(roman);
        resultValue.textContent = number;
        resultDiv.className = 'result success';
        
        HistoryManager.addConversion(roman, number, 'roman-to-arabic');
        
    } catch (error) {
        resultValue.textContent = error.message;
        resultDiv.className = 'result error';
    }
}

function clearHistory() {
    HistoryManager.clearHistory();
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
    HistoryManager.updateDisplay();
    PopupManager.init();
    
    document.getElementById('arabicInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertToRoman();
        }
    });

    document.getElementById('romanInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertToArabic();
        }
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Exportar para tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RomanConverter, ThemeManager, HistoryManager, PopupManager };
}