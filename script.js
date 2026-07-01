// --- Partículas de Esencia ---
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = -(Math.random() * 1.2 + 0.3);
        this.opacity = Math.random() * 0.5 + 0.2;
        this.glow = Math.random() * 10 + 5;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.y < -10) { this.y = canvas.height + 10; this.x = Math.random() * canvas.width; }
    }
    draw() {
        ctx.save(); ctx.shadowBlur = this.glow; ctx.shadowColor = 'rgba(224, 247, 250, 0.8)';
        ctx.fillStyle = `rgba(224, 247, 250, ${this.opacity})`; ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
}
function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();

// --- Máquina de Escribir ---
const textElement = document.getElementById('typewriter-text');
let phrase = "In the depths of mind, a memory awakens...";
let phraseIndex = 0;

function typeWriter() {
    if (phraseIndex < phrase.length) {
        textElement.innerHTML = phrase.substring(0, phraseIndex + 1) + '<span class="cursor">|</span>';
        phraseIndex++;
        setTimeout(typeWriter, 75);
    }
}

// --- Barra de Carga ---
const loadingBar = document.getElementById('loadingBar');
const loadingStatus = document.getElementById('loadingStatus');
const loadingWrapper = document.getElementById('loadingWrapper');
const puzzleSection = document.getElementById('puzzle-section');
let progress = 0;

function updateLoading() {
    if (progress < 100) {
        progress += Math.random() * 3;
        if (progress > 100) progress = 100;
        loadingBar.style.width = `${progress}%`;
        if (progress > 40 && progress < 80) loadingStatus.textContent = "Afilando el Aguijón...";
        if (progress > 80) loadingStatus.textContent = "Estructurando el sueño...";
        setTimeout(updateLoading, 100);
    } else {
        // Al terminar de cargar, escondemos la barra y mostramos el Puzzle
        loadingWrapper.classList.add('hidden');
        phrase = "El Sello del Sueño bloquea el camino...";
        phraseIndex = 0;
        typeWriter(); // Cambia el texto superior
        puzzleSection.classList.remove('hidden');
    }
}

// --- LÓGICA DEL PUZZLE ---
// El orden correcto de los IDs es: 2 (Centro), 1 (Izquierda), 3 (Derecha)
const correctSequence = [2, 1, 3];
let playerSequence = [];
const orbs = document.querySelectorAll('.dream-orb');
const sealIcon = document.getElementById('seal-icon');
const enterButton = document.getElementById('enterButton');

orbs.forEach(orb => {
    orb.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        
        // Evitar clics si ya se activó
        if (e.target.classList.contains('active')) return;

        e.target.classList.add('active');
        playerSequence.push(id);

        // Validar si va bien
        const currentIndex = playerSequence.length - 1;
        if (playerSequence[currentIndex] !== correctSequence[currentIndex]) {
            // ¡ERROR! Secuencia incorrecta
            orbs.forEach(o => o.classList.add('error-orb'));
            document.querySelector('.main-container').classList.add('shake');
            sealIcon.textContent = "❌";
            
            setTimeout(() => {
                // Reiniciar el puzzle
                playerSequence = [];
                orbs.forEach(o => o.classList.remove('active', 'error-orb'));
                document.querySelector('.main-container').classList.remove('shake');
                sealIcon.textContent = "🔒";
            }, 800);
            return;
        }

        // Si completó la secuencia bien
        if (playerSequence.length === correctSequence.length) {
            sealIcon.textContent = "✧";
            sealIcon.style.textShadow = "0 0 30px #0ea5e9";
            puzzleSection.classList.add('hidden');
            
            textElement.innerHTML = "El sello se ha roto. Despierta.";
            enterButton.classList.add('visible');
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500);
    setTimeout(updateLoading, 1500);
});
