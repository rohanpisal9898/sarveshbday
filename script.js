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
function nextScreen(currentScreenNum) {
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

// --- Particles Background ---
function createParticles() {
    const container = document.getElementById('particles');
    // Number of particles depends on screen width, max 80
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80); 
    
    // Using curated glowing colors to match the screenshot background
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#4fd1c5'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Give particles a slight glow
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        container.appendChild(particle);
    }
}

// Init particles on load
window.addEventListener('load', createParticles);

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
