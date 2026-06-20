const classNameInput = document.getElementById("className");
const studentCountInput = document.getElementById("studentCount");
const setBtn = document.getElementById("setBtn");
const resetBtn = document.getElementById("resetBtn");
const shootBtn = document.getElementById("shootBtn");
const rangeButtons = document.querySelectorAll(".range-btn");

const splash = document.getElementById("splash");
const splashText = document.querySelector(".splash-text");
const statusText = document.getElementById("statusText");
const waterStream = document.getElementById("waterStream");
const pickedList = document.getElementById("pickedList");

let studentCount = 28;
let selectedRange = { start: 1, end: 10 };
let pickedNumbers = [];
let isDrawing = false;

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
