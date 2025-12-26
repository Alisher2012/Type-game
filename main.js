// ========== SO‘ZLAR ==========
const wordsString = `
apple book car dog egg
family game house idea job
key light money name orange
people road school time water
computer mouse keyboard screen city
music movie camera photo friend
teacher student market food bread
sun moon star cloud rain
animal bird fish horse cow
bus train plane ticket map
`;

const words = wordsString.trim().split(/\s+/);

// ========== DOM ==========
const wordEl = document.getElementById("word");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const levelEl = document.getElementById("level");
const gameOverEl = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

// ========== O‘ZGARUVCHILAR ==========
let score = 0;
let time = 0;
let timer = null;
let gameStarted = false;

// ========== LEVEL TIME ==========
function getLevelTime() {
  return Number(levelEl.value);
}

// ========== RANDOM SO‘Z ==========
function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// ========== BOSHLANG‘ICH ==========
function initGame() {
  score = 0;
  scoreEl.textContent = score;

  time = getLevelTime();
  timeEl.textContent = time;

  wordEl.textContent = randomWord();
  input.value = "";
  input.focus();

  gameStarted = false;
  clearInterval(timer);
}

initGame();

// ========== TIMER ==========
function startTimer() {
  if (gameStarted) return;

  gameStarted = true;
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      showGameOver();
    }
  }, 1000);
}

// ========== INPUT ==========
input.addEventListener("input", () => {
  // ⏱ birinchi yozishda timer boshlanadi
  startTimer();

  if (input.value === wordEl.textContent) {
    score++;
    scoreEl.textContent = score;

    input.value = "";
    wordEl.textContent = randomWord();

    // 🔥 time reset
    time = getLevelTime();
    timeEl.textContent = time;
  }
});

// ========== LEVEL CHANGE ==========
levelEl.addEventListener("change", () => {
  time = getLevelTime();
  timeEl.textContent = time;
});

// ========== GAME OVER ==========
function showGameOver() {
  finalScoreEl.textContent = score;
  gameOverEl.style.display = "flex";
}

// ========== RESTART ==========
function restart() {
  gameOverEl.style.display = "none";
  initGame();
}
