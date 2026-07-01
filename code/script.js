// --- Configuración de Partículas (Esencia de Sueño) ---
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
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
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = 'rgba(224, 247, 250, 0.8)';
        ctx.fillStyle = `rgba(224, 247, 250, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// --- Lógica del Efecto Máquina de Escribir ---
const textElement = document.getElementById('typewriter-text');
const phrase = "In the depths of mind, a memory awakens...";
let phraseIndex = 0;

function typeWriter() {
    if (phraseIndex < phrase.length) {
        textElement.innerHTML = phrase.substring(0, phraseIndex + 1) + '<span class="cursor">|</span>';
        phraseIndex++;
        setTimeout(typeWriter, 75); // Velocidad del tipeado
    } else {
        // Remover el cursor estático al terminar
        document.querySelector('.cursor').style.animation = 'blink 0.8s infinite';
    }
}


// --- Lógica de la Barra de Carga ---
const loadingBar = document.getElementById('loadingBar');
const loadingStatus = document.getElementById('loadingStatus');
const enterButton = document.getElementById('enterButton');

let progress = 0;
const statusPhrases = [
    "Reuniendo esencia...",
    "Afilando el Aguijón...",
    "Abriendo portales de ensueño...",
    "Revelando 'The Tale of Ema'..."
];

function updateLoading() {
    if (progress < 100) {
        progress += Math.random() * 2.5; // Incrementos semi-aleatorios para realismo
        if (progress > 100) progress = 100;
        
        loadingBar.style.width = `${progress}%`;

        // Cambiar dinámicamente los mensajes según el porcentaje
        if (progress > 25 && progress < 50) loadingStatus.textContent = statusPhrases[1];
        if (progress > 50 && progress < 85) loadingStatus.textContent = statusPhrases[2];
        if (progress > 85) loadingStatus.textContent = statusPhrases[3];

        setTimeout(updateLoading, 100);
    } else {
        loadingStatus.textContent = "Sueño sincronizado.";
        // Mostrar el botón con una animación suave
        enterButton.classList.add('visible');
    }
}

// Iniciar secuencias cuando cargue la ventana
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500); // Pequeño retraso para la atmósfera
    setTimeout(updateLoading, 1500);
});