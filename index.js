const timerSection = document.getElementById("section-timer");
const todoSection = document.getElementById("section-todo");
const navTimerBtn = document.getElementById("nav-timer-btn");
const navTodoBtn = document.getElementById("nav-todo-btn");

navTimerBtn.addEventListener("click", () => {
  timerSection.style.display = "block";
  todoSection.style.display = "none";
});

navTodoBtn.addEventListener("click", () => {
  timerSection.style.display = "none";
  todoSection.style.display = "block";
});

// this is for the timer-page
let timer;
let timeLeft;

const display = document.getElementById("timer-display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timeSelect = document.getElementById("timerange");
const subjectSelect = document.getElementById("subject");
const currentTime = document.getElementById("currentTime");

function updateCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  currentTime.textContent = `${hours}:${minutes}:${seconds}`;

  return currentTime.textContent;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return display.textContent;
}

startBtn.addEventListener("click", () => {
  if (timer) return;

  if (!timeLeft) {
    timeLeft = parseInt(timeSelect.value) * 60;
  }

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Study session complete!");
    }
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  subjectSelect.disabled = true;
  timeSelect.disabled = true;
  startBtn.textContent = "Resume";
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  startBtn.textContent = "Resume";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 0;
  display.textContent = "00:00";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  subjectSelect.disabled = false;
  timeSelect.disabled = false;
  startBtn.textContent = "Start";
  stopBtn.textContent = "pause";
});

// this is for the todo-page
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

addTaskBtn.addEventListener("click", () => {
  const taskAlert = document.getElementById("task-alert");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    taskAlert.textContent = "Please enter a task.";
    setTimeout(() => (taskAlert.textContent = ""), 3000);
    return;
  }

  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div>
          <button class="complete-btn btn btn-sm btn-outline-success">Complete</button>
          <button class="delete-btn btn btn-sm btn-outline-danger">Delete</button>
      </div>
  `;

  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.querySelector(".task-text").style.textDecoration = "line-through";
    li.querySelector(".task-text").style.color = "gray";
    li.querySelector(".complete-btn").disabled = true;
    li.querySelector(".complete-btn").textContent = "Completed";
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  taskList.appendChild(li);

  taskInput.value = "";
});
// Initialize all popovers on the page
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]',
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl),
);
