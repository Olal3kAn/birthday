const birthday = new Date(2026, 10, 8, 0, 0, 0);
const countdownScreen = document.getElementById("countdown-screen");
const cakeScreen = document.getElementById("cake-screen");
const mainSite = document.getElementById("main-site");
const candles = [...document.querySelectorAll(".candle")];
const enterButton = document.getElementById("enter-button");
const candleHint = document.getElementById("candle-hint");

function showBirthdayReveal() {
  countdownScreen.classList.add("hidden");
  cakeScreen.classList.remove("hidden");
  launchConfetti(90);
}
function updateCountdown() {
  const now = new Date();
  const remaining = birthday - now;
  if (remaining <= 0) {
    showBirthdayReveal();
    clearInterval(countdownTimer);
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

candles.forEach((candle) =>
  candle.addEventListener("click", () => {
    if (candle.classList.contains("blown")) return;
    candle.classList.add("blown");
    if (candles.every((item) => item.classList.contains("blown"))) {
      candleHint.textContent = "WISH MADE. LET THE CELEBRATION BEGIN.";
      enterButton.classList.remove("hidden");
      launchConfetti(35);
    }
  }),
);
enterButton.addEventListener("click", () => {
  cakeScreen.classList.add("hidden");
  mainSite.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
  launchConfetti(120);
});

// Confetti celebration
function launchConfetti(amount = 60) {
  const colors = [
    "#d6b66c",
    "#f5e6bf",
    "#ffffff",
    "#bd7d42",
    "#a9b8a0",
    "#d77d65",
  ];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 3 + Math.random() * 4 + "s";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 8500);
  }
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
document.querySelectorAll(".memory-card img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.remove("hidden");
  });
});
document
  .getElementById("lightbox-close")
  .addEventListener("click", () => lightbox.classList.add("hidden"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.add("hidden");
});

const musicButton = document.getElementById("music-button");
const audio = document.getElementById("birthday-audio");
let musicOn = false;
musicButton.addEventListener("click", async () => {
  if (!audio.querySelector("source")) {
    musicButton.querySelector("span").textContent = "Add your song";
    return;
  }
  if (musicOn) {
    audio.pause();
    musicOn = false;
    musicButton.querySelector("span").textContent = "Music off";
  } else {
    try {
      await audio.play();
      musicOn = true;
      musicButton.querySelector("span").textContent = "Music on";
    } catch (e) {
      musicButton.querySelector("span").textContent = "Tap again";
    }
  }
});

let button = document.getElementById("wishedbtn");

button.addEventListener("click", function () {
  alert("Thanks for wishing him 💘");
});
