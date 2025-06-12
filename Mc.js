let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}

function changeSlide(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName("slide");
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});
//sticky nav  
const nav = document.getElementById('nav');
const navTop = nav.offsetTop;
window.addEventListener('scroll', function() {
    if (window.scrollY >= navTop) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});
// Mode toggle logic for day/night background
const modeToggle = document.getElementById('mode-toggle');
function setDayMode() {
    document.body.classList.remove('night-mode');
    document.body.classList.add('day-mode');
    modeToggle.textContent = 'Toggle Day/Night';
}
function setNightMode() {
    document.body.classList.remove('day-mode');
    document.body.classList.add('night-mode');
    modeToggle.textContent = 'Toggle Day/Night';
}

// Default to day mode
setDayMode();

modeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('night-mode')) {
        setDayMode();
    } else {
        setNightMode();
    }
});

// Rain effect toggle logic
let rainEnabled = false;
let rainCanvas = null;
let rainCtx = null;
let rainAnimationId = null;
let drops = [];
const dropCount = 500;

function createRainCanvas() {
    rainCanvas = document.createElement('canvas');
    rainCanvas.id = 'rainCanvas';
    rainCanvas.style.position = 'fixed';
    rainCanvas.style.top = '0';
    rainCanvas.style.left = '0';
    rainCanvas.style.width = '100%';
    rainCanvas.style.height = '100%';
    rainCanvas.style.pointerEvents = 'none';
    rainCanvas.style.zIndex = '-1';
    document.body.appendChild(rainCanvas);
    rainCtx = rainCanvas.getContext('2d');
    resizeRainCanvas();
    window.addEventListener('resize', resizeRainCanvas);
}

function removeRainCanvas() {
    if (rainCanvas) {
        window.removeEventListener('resize', resizeRainCanvas);
        rainCanvas.remove();
        rainCanvas = null;
        rainCtx = null;
    }
}

function resizeRainCanvas() {
    if (rainCanvas) {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
    }
}

function initRainDrops() {
    drops = [];
    for (let i = 0; i < dropCount; i++) {
        drops.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            length: Math.random() * 18 + 12,
            speed: Math.random() * 8 + 8,
            opacity: Math.random() * 0.3 + 0.2,
            thickness: Math.random() * 1.2 + 0.8,
            wind: Math.random() * 1.5 - 0.75 // wind effect
        });
    }
}

function drawRain() {
    if (!rainEnabled || !rainCtx) return;
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    for (let i = 0; i < dropCount; i++) {
        const drop = drops[i];
        rainCtx.save();
        rainCtx.globalAlpha = drop.opacity;
        rainCtx.strokeStyle = 'rgba(120, 180, 255, 0.7)';
        rainCtx.shadowColor = 'rgba(120,180,255,0.5)';
        rainCtx.shadowBlur = 4;
        rainCtx.lineWidth = drop.thickness;
        rainCtx.beginPath();
        rainCtx.moveTo(drop.x, drop.y);
        rainCtx.lineTo(drop.x + drop.wind, drop.y + drop.length);
        rainCtx.stroke();
        rainCtx.restore();
        drop.x += drop.wind;
        drop.y += drop.speed;
        if (drop.y > rainCanvas.height || drop.x < 0 || drop.x > rainCanvas.width) {
            drop.y = -20;
            drop.x = Math.random() * rainCanvas.width;
            drop.wind = Math.random() * 1.5 - 0.75;
        }
    }
    rainAnimationId = requestAnimationFrame(drawRain);
}

function enableRain() {
    if (rainEnabled) return;
    rainEnabled = true;
    createRainCanvas();
    initRainDrops();
    drawRain();
}

function disableRain() {
    rainEnabled = false;
    if (rainAnimationId) cancelAnimationFrame(rainAnimationId);
    removeRainCanvas();
}

document.getElementById('rain-toggle').addEventListener('click', function() {
    if (rainEnabled) {
        disableRain();
        this.textContent = 'Enable Rain';
    } else {
        enableRain();
        this.textContent = 'Disable Rain';
    }
});

// Optionally, start with rain disabled and button text as 'Enable Rain'
document.getElementById('rain-toggle').textContent = 'Enable Rain';


document.getElementById("happyghast").addEventListener(

function(){
    window.location.href="ghastlings.html"
});