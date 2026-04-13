// --- Audio Controller ---
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

// Aggressively attempt to autoplay on page load
window.addEventListener('load', () => {
    if (!isMusicPlaying) playMusic();
});

// Fallback: If browser blocks the initial autoplay, play on very first click anywhere
document.body.addEventListener('click', () => {
    if (!isMusicPlaying) {
        playMusic();
    }
}, { once: true });

function playMusic() {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
    }).catch(err => {
        console.log("Audio autoplay was prevented by standard browser policies:", err);
    });
}

// --- Navigation ---
function nextScreen(currentScreenNum, event) {
    // Generate expanding ripple effect
    if (event) {
        const ripple = document.createElement('div');
        ripple.className = 'screen-transition-ripple';
        ripple.style.left = `${event.clientX}px`;
        ripple.style.top = `${event.clientY}px`;
        document.body.appendChild(ripple);
        
        // cleanup ripple later
        setTimeout(() => ripple.remove(), 1500);
    }

    const currentScreen = document.getElementById(`screen-${currentScreenNum}`);
    const nextScreen = document.getElementById(`screen-${currentScreenNum + 1}`);

    if (currentScreen && nextScreen) {
        currentScreen.classList.remove('active');
        
        // Wait for fade out
        setTimeout(() => {
            currentScreen.classList.add('hidden');
            nextScreen.classList.remove('hidden');
            
            // Allow display:none to be removed before adding opacity
            setTimeout(() => {
                nextScreen.classList.add('active');
            }, 50);
        }, 800);
    }
}

// --- Particles & Emojis Background ---
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50); 
    
    const emojis = ['🎈', '✨', '🎉', '💖', '🎵', '🎂'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Render as floating emojis instead of dots
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.fontSize = `${size * 10}px`;
        particle.style.background = 'transparent';
        particle.style.boxShadow = 'none';
        particle.style.filter = `blur(${Math.random() * 1}px)`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        container.appendChild(particle);
    }
}

// Init features on load
window.addEventListener('load', () => {
    createParticles();
    
    // Typewriter effect for paragraphs
    const paragraphs = document.querySelectorAll('.message-content p, .message-content h3');
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(15px)';
        p.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 600 + (index * 400)); // Stagger by 400ms each
    });
});

// --- Interactive Cursor, Spotlight & 3D Tilt ---
const cursorGlow = document.getElementById('cursor-glow');
const spotlight = document.getElementById('spotlight');
const messageCard = document.querySelector('.message-content');

document.addEventListener('mousemove', (e) => {
    // Move custom cursor
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
    
    // Dynamic Spotlight following cursor
    if (spotlight) {
        // Spotlight radius shifts slightly with movement
        spotlight.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, transparent 10%, rgba(2, 2, 6, 0.85) 120%)`;
    }
    
    // 3D Tilt for the main message card
    if (messageCard && !messageCard.closest('.hidden')) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        messageCard.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});

// --- Neon Click Sparks ---
document.addEventListener('click', (e) => {
    // Generate bursting mini-sparks at click coordinates
    const burstCount = 10;
    for (let i = 0; i < burstCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'click-spark';
        document.body.appendChild(spark);

        const angle = (Math.PI * 2 * i) / burstCount;
        const velocity = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        
        setTimeout(() => spark.remove(), 600);
    }
});


// --- Webhook / Surprise ---
async function triggerSurprise() {
    const btn = document.getElementById('surprise-btn');
    const statusText = document.getElementById('calling-status');
    
    // Webhook URL from the user
    const YOUR_WEBHOOK_URL = 'https://amrut34.app.n8n.cloud/webhook/emergency-call';
    
    btn.classList.add('disabled');
    btn.innerText = 'CALLING...';
    btn.onclick = null; // Prevent double click

    try {
        statusText.innerText = 'Calling... 📞';
        
        // CONFETTI BLAST
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#4fd1c5'],
                ticks: 300,
                gravity: 0.8
            });
        }
        
        const response = await fetch(YOUR_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "location": "Happy Birthday Sarvesh! Hope you have a wonderful day and an amazing year ahead bro!",
                "ambulance_number": "+918600866956",
                "fire_number": "+919876543210"
            })
        });

        btn.innerText = 'CALL SENT!';
        btn.classList.remove('pulse');
        statusText.innerText = 'Incoming surprise! Check your phone 👀';

    } catch (error) {
        console.error('Webhook error:', error);
        btn.innerText = 'TRY AGAIN';
        btn.classList.remove('disabled');
        btn.onclick = triggerSurprise;
        statusText.innerText = 'Oops, connection issue. Let\'s try again.';
    }
}
