const classNameInput = document.getElementById("className");
const studentCountInput = document.getElementById("studentCount");
const setBtn = document.getElementById("setBtn");
const resetBtn = document.getElementById("resetBtn");
const shootBtn = document.getElementById("shootBtn");
const rangeButtons = document.querySelectorAll(".range-btn");

const splash = document.getElementById("splash");
const splashText = document.querySelector(".splash-text");
const statusText = document.getElementById("statusText");
const soundText = document.getElementById("soundText");
const waterStream = document.getElementById("waterStream");
const pickedList = document.getElementById("pickedList");

let studentCount = 28;
let selectedRange = { start: 1, end: 10 };
let pickedNumbers = [];
let isDrawing = false;
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playPiyongSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(520, now);
  oscillator.frequency.exponentialRampToValueAtTime(1080, now + 0.18);
  oscillator.frequency.exponentialRampToValueAtTime(700, now + 0.32);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.24, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.38);

  showSoundText("피용!");
}

function playPangSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(190, now);
  oscillator.frequency.exponentialRampToValueAtTime(70, now + 0.18);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.3);

  setTimeout(() => {
    playSparkleSound();
  }, 80);

  showSoundText("팡!");
}

function playSparkleSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  [880, 1175, 1568].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + index * 0.06;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.18);
  });
}

function showSoundText(text) {
  soundText.textContent = text;
  soundText.classList.remove("show");

  void soundText.offsetWidth;

  soundText.classList.add("show");
}

function setupClass() {
  studentCount = Number(studentCountInput.value);

  if (!studentCount || studentCount < 1) {
    alert("학생 수를 1명 이상으로 입력해 주세요.");
    return;
  }

  pickedNumbers = [];
  splashText.textContent = "?";
  statusText.textContent = "뽑을 구간을 선택하세요.";
  shootBtn.disabled = false;
  renderPickedList();
}

function selectRange(button) {
  if (isDrawing) return;

  rangeButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  selectedRange = {
    start: Number(button.dataset.start),
    end: Number(button.dataset.end)
  };

  statusText.textContent =
    `${selectedRange.start}~${selectedRange.end}번 구간이 선택되었습니다.`;
  shootBtn.disabled = false;
}

function shootWaterGun() {
  if (isDrawing) return;

  const possibleNumbers = [];

  for (let i = selectedRange.start; i <= selectedRange.end; i++) {
    if (i <= studentCount && !pickedNumbers.includes(i)) {
      possibleNumbers.push(i);
    }
  }

  if (possibleNumbers.length === 0) {
    alert(`${selectedRange.start}~${selectedRange.end}번 구간에는 더 이상 뽑을 번호가 없습니다.`);
    return;
  }

  isDrawing = true;
  setDisabled(true);

  playPiyongSound();

  splashText.textContent = "!";
  statusText.textContent = "물총 발사 준비 중...";
  splash.classList.add("loading");
  waterStream.classList.add("shooting");

  setTimeout(() => {
    statusText.textContent = "쏜다! 쏜다! 쏜다!";
    splashText.textContent = "💦";
  }, 1000);

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    const selectedNumber = possibleNumbers[randomIndex];

    pickedNumbers.push(selectedNumber);

    playPangSound();

    splash.classList.remove("loading");
    splash.classList.add("ready");
    waterStream.classList.remove("shooting");

    splashText.textContent = selectedNumber;
    statusText.textContent = `${selectedNumber}번 학생 발표!`;

    renderPickedList();

    setTimeout(() => {
      splash.classList.remove("ready");
    }, 600);

    isDrawing = false;
    setDisabled(false);
  }, 3000);
}

function setDisabled(disabled) {
  setBtn.disabled = disabled;
  resetBtn.disabled = disabled;
  shootBtn.disabled = disabled;
  rangeButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function renderPickedList() {
  pickedList.innerHTML = "";

  pickedNumbers.forEach((number) => {
    const span = document.createElement("span");
    span.className = "picked-number";
    span.textContent = `${number}번`;
    pickedList.appendChild(span);
  });
}

setBtn.addEventListener("click", setupClass);
resetBtn.addEventListener("click", setupClass);
shootBtn.addEventListener("click", shootWaterGun);

rangeButtons.forEach((button) => {
  button.addEventListener("click", () => selectRange(button));
});

setupClass();
