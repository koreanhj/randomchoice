const classNameInput = document.getElementById("className");
const studentCountInput = document.getElementById("studentCount");
const setBtn = document.getElementById("setBtn");
const drawBtn = document.getElementById("drawBtn");
const resetBtn = document.getElementById("resetBtn");
const classTitle = document.getElementById("classTitle");
const resultNumber = document.getElementById("resultNumber");
const pickedList = document.getElementById("pickedList");

let studentCount = 30;
let availableNumbers = [];
let pickedNumbers = [];

function setupClass() {
  const className = classNameInput.value.trim() || "우리 반";
  studentCount = Number(studentCountInput.value);

  if (!studentCount || studentCount < 1) {
    alert("학생 수를 1명 이상으로 입력해 주세요.");
    return;
  }

  availableNumbers = Array.from({ length: studentCount }, (_, i) => i + 1);
  pickedNumbers = [];

  classTitle.textContent = className;
  resultNumber.textContent = "?";
  renderPickedList();
}

function drawNumber() {
  if (availableNumbers.length === 0) {
    alert("모든 번호를 다 뽑았습니다. 처음부터 다시 시작해 주세요.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];

  pickedNumbers.push(selectedNumber);
  resultNumber.textContent = selectedNumber;

  renderPickedList();
}

function resetAll() {
  setupClass();
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
drawBtn.addEventListener("click", drawNumber);
resetBtn.addEventListener("click", resetAll);

setupClass();
