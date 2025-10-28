const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [], shootingStars = [], nebula = [], constellations = [];

function random(min, max) { return Math.random() * (max - min) + min; }


for (let i = 0; i < 500; i++) {
  const colors = ['#ffffff', '#ffb3ff', '#b3e0ff'];
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: random(0.3, 1),
    flicker: random(0.002, 0.008),
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}


for (let i = 0; i < 70; i++) {
  nebula.push({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    size: random(150, 400),
    color: `hsla(${random(260, 310)}, 100%, ${random(55, 75)}%, ${random(0.05, 0.25)})`,
    drift: random(0.0003, 0.001)
  });
}

// Constelaciones
function crearConstelacion() {
  const estrellas = [];
  for (let i = 0; i < 6; i++) {
    estrellas.push({ x: random(100, canvas.width - 100), y: random(100, canvas.height - 100) });
  }
  constellations.push({ estrellas, vida: 1 });
}
setInterval(crearConstelacion, 12000);

let angle = 0;
let zoom = 1;

function draw() {
  ctx.fillStyle = "rgba(5, 0, 15, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  zoom = 1 + Math.sin(Date.now() * 0.0003) * 0.02;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(zoom, zoom);
  ctx.rotate(angle);
  angle += 0.0004;

  for (let n of nebula) {
    n.color = `hsla(${(Date.now() / 100 + n.x / 10) % 360}, 100%, 60%, ${random(0.05, 0.25)})`;
    const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size);
    gradient.addColorStop(0, n.color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  for (let s of stars) {
    s.alpha += s.flicker * (Math.random() < 0.5 ? -1 : 1);
    s.alpha = Math.max(0.3, Math.min(1, s.alpha));
    const glow = Math.sin(Date.now() * 0.002 + s.x) * 0.3 + 1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius * glow, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRgb(s.color)},${s.alpha})`;
    ctx.fill();
  }

  if (Math.random() < 0.004) {
    shootingStars.push({ x: Math.random() * canvas.width, y: Math.random() * (canvas.height / 2),
      dx: random(10, 14), dy: random(4, 7), len: random(80, 120), life: 1 });
  }

  for (let s of shootingStars) {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len, s.y - s.len / 2);
    ctx.strokeStyle = `rgba(255,255,255,${s.life})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    s.x += s.dx; s.y += s.dy; s.life -= 0.01;
  }

  for (let c of constellations) {
    ctx.beginPath();
    for (let i = 0; i < c.estrellas.length - 1; i++) {
      ctx.moveTo(c.estrellas[i].x, c.estrellas[i].y);
      ctx.lineTo(c.estrellas[i + 1].x, c.estrellas[i + 1].y);
    }
    ctx.strokeStyle = `rgba(255,200,255,${c.vida})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    c.vida -= 0.003;
  }

  constellations = constellations.filter(c => c.vida > 0);
  requestAnimationFrame(draw);
}
draw();


function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤';
  heart.style.left = random(0, window.innerWidth - 20) + 'px';
  heart.style.top = random(0, window.innerHeight - 20) + 'px';
  heart.style.animationDuration = random(3, 5) + 's';
  heart.style.color = `hsl(${random(300, 360)},100%,70%)`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 500);


const frases = [
  "Eres mi universo favorito 🌌","Brillas más que todas las estrellas ✨",
  "Mi corazón orbita alrededor del tuyo 💖","Nuestro amor es infinito ♾️",
  "Tu mirada tiene su propia galaxia 💫","Cada latido lleva tu nombre 💕",
  "Entre millones de estrellas, te elegí a ti 🌠","Tu amor ilumina mi cielo oscuro 💜",
  "Eres la constelación que guía mis noches 🌙","Sin ti, mi mundo se apaga 🪐",
  "Te pienso hasta en las estrellas fugaces 💫","Tu amor me hace flotar sin gravedad 💫",
  "Entre todos te vi a ti 💘","Alegras mis días ☀️",
  "Eres mi luz incluso en la noche más oscura 🌙","Te amo con todo mi ser 💖",
  "Eres mi bebita 🧸","Eres mi pollito 🐥","Eres mi peque 💕",
  "Eres mi princesa 👑","Gracias por ser lo que eres ✨",
  "Nunca cambies 💫","Mi alma sonríe cuando escucho tu nombre 💞",
  "Eres la razón por la que mi cielo siempre tiene estrellas ✨",
  "No necesito magia, ya te tengo a ti 💕","Eres mi refugio en este universo infinito 🌌",
  "Si pudiera pedir un deseo, siempre serías tú 🌠","Tus abrazos son mi lugar favorito 💗",
  "Cuando sonríes, el universo se ilumina 🔮","Eres mi poema favorito hecho persona 💖",
  "Nada brilla tanto como tu mirada 💫","En tu amor encontré mi galaxia perfecta 🌈"
];

function mostrarFrase() {
  const frase = document.createElement('div');
  frase.className = 'phrase';
  frase.textContent = frases[Math.floor(Math.random() * frases.length)];
  frase.style.left = random(50, window.innerWidth - 350) + 'px';
  frase.style.top = random(50, window.innerHeight - 150) + 'px';
  document.body.appendChild(frase);
  setTimeout(() => frase.remove(), 7000);
}
setInterval(mostrarFrase, 5000);

// 🎵 música
const botonMusica = document.getElementById('playMusic');
let musica;

function activarMusica() {
  if (!musica) {
    musica = new Audio('up.mp3');
    musica.loop = true;
    musica.volume = 0.6;
    musica.play();
    botonMusica.textContent = "🎵 Música activa";
  } else {
    if (musica.paused) {
      musica.play();
      botonMusica.textContent = "🎵 Música activa";
    } else {
      musica.pause();
      botonMusica.textContent = "🔇 Activar música";
    }
  }
}
botonMusica.addEventListener('click', activarMusica);

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
}


const carta = document.getElementById('carta');
const cerrarCarta = document.getElementById('cerrarCarta');

carta.addEventListener('click', (e) => {
  if (!carta.classList.contains('abierta')) carta.classList.add('abierta');
  e.stopPropagation();
});

cerrarCarta.addEventListener('click', (e) => {
  carta.classList.remove('abierta');
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (carta.classList.contains('abierta') && !carta.contains(e.target)) {
    carta.classList.remove('abierta');
  }
});
