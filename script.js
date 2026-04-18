const display = document.getElementById("input");
const buttons = document.querySelectorAll("button.key");
const capsDot = document.getElementById("capsDot");
const scrollUp = document.getElementById("scrollUp");
const scrollDown = document.getElementById("scrollDown");
let isUpper = true;

// ── Scroll buttons ───────────────────────────────────────────────
scrollUp.addEventListener("click", () => {
    display.scrollTop -= 40;
});
scrollDown.addEventListener("click", () => {
    display.scrollTop += 40;
});

// Auto-scroll to bottom as user types
function autoScroll() {
    display.scrollTop = display.scrollHeight;
}

// ── Caps indicator ──────────────────────────────────────────────
function updateCapsIndicator() {
    capsDot.classList.toggle("on", isUpper);
}
updateCapsIndicator();

// ── Case helpers ─────────────────────────────────────────────────
function toLower() {
    isUpper = false;
    updateCapsIndicator();
    buttons.forEach(btn => {
        if (!["Space", "⌫ Del", "Shift", "shift", ",", "."].includes(btn.innerText)) {
            btn.innerText = btn.innerText.toLowerCase();
        }
    });
}

function toUpper() {
    isUpper = true;
    updateCapsIndicator();
    buttons.forEach(btn => {
        if (!["Space", "⌫ Del", "Shift", "shift", ",", "."].includes(btn.innerText)) {
            btn.innerText = btn.innerText.toUpperCase();
        }
    });
}

// ── Ripple effect ────────────────────────────────────────────────
function spawnRipple(btn, e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (e ? e.clientX - rect.left : rect.width / 2) - size / 2;
    const y = (e ? e.clientY - rect.top : rect.height / 2) - size / 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
}

// ── Particle burst on keypress ───────────────────────────────────
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];

function spawnParticles(x, y, color = "#4ecca3") {
    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i + (Math.random() - 0.5) * 0.5;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            size: 2 + Math.random() * 3,
            color,
            decay: 0.03 + Math.random() * 0.03
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ── Key press logic ──────────────────────────────────────────────
function pressKey(btn, e) {
    const text = btn.innerText;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    if (text === "Space") {
        display.value += " ";
        spawnParticles(cx, cy, "#4ecca3");
    } else if (text === "⌫ Del") {
        display.value = display.value.slice(0, -1);
        spawnParticles(cx, cy, "#e94560");
    } else if (text === "Shift") {
        toLower();
        spawnParticles(cx, cy, "#6464ff");
    } else if (text === "shift") {
        toUpper();
        spawnParticles(cx, cy, "#6464ff");
    } else {
        display.value += text;
        spawnParticles(cx, cy, "#4ecca3");
    }

    spawnRipple(btn, e);
    autoScroll();
}

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => pressKey(btn, e));
});

// ── Physical keyboard support ────────────────────────────────────
window.addEventListener("keydown", (e) => {
    const pressed = document.querySelector(`[data-key="${e.code}"]`);
    if (pressed) {
        pressed.click();
        pressed.classList.add("active");
        setTimeout(() => pressed.classList.remove("active"), 150);
    }
});
