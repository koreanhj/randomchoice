* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Pretendard", "Noto Sans KR", Arial, sans-serif;
  background: linear-gradient(135deg, #e3f2fd, #fff8e1);
  color: #222;
}

.app {
  width: min(92%, 720px);
  margin: 40px auto;
  text-align: center;
}

h1 {
  font-size: 40px;
  margin-bottom: 8px;
}

.subtitle {
  margin-bottom: 28px;
  color: #555;
}

.card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.settings {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: end;
}

label {
  text-align: left;
  font-weight: 700;
}

input {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
}

button {
  border: none;
  border-radius: 14px;
  padding: 13px 20px;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  background: #1976d2;
  color: white;
}

button:hover {
  background: #0d47a1;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.secondary {
  background: #777;
  margin-top: 16px;
}

.secondary:hover {
  background: #444;
}

#classTitle {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
}

#resultNumber {
  width: 180px;
  height: 180px;
  margin: 20px auto 10px;
  border-radius: 50%;
  background: #ffca28;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 86px;
  font-weight: 900;
}

#resultNumber.loading {
  animation: shake 0.25s infinite;
  font-size: 40px;
}

#statusText {
  font-weight: 700;
  color: #555;
  min-height: 24px;
}

.range-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.range-buttons button {
  background: #1565c0;
}

h2 {
  margin-top: 0;
}

.picked-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  min-height: 42px;
}

.picked-number {
  background: #e3f2fd;
  color: #0d47a1;
  border-radius: 999px;
  padding: 10px 15px;
  font-weight: 800;
}

@keyframes shake {
  0% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
}

@media (max-width: 640px) {
  .settings {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 32px;
  }

  #resultNumber {
    width: 150px;
    height: 150px;
    font-size: 70px;
  }
}
