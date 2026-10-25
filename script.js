
const schedules = {
    normal: [
        { day: "Monday", subject: "DSA with C", minutes: 60 },
        { day: "Tuesday", subject: "Java", minutes: 60 },
        { day: "Wednesday", subject: "Web Technology", minutes: 60 },
        { day: "Thursday", subject: "COA + DCCN", minutes: 60 },
        { day: "Friday", subject: "DSA + Career Prep", minutes: 60 },
        { day: "Saturday", subject: "Web Project + Java", minutes: 60 },
        { day: "Sunday", subject: "Weekly Review", minutes: 60 }
    ],

    exam: [
        { day: "Monday", subject: "Nearest Exam Subject", minutes: 30 },
        { day: "Tuesday", subject: "Exam Revision", minutes: 30 },
        { day: "Wednesday", subject: "Practice Questions", minutes: 30 },
        { day: "Thursday", subject: "Weak Topics", minutes: 30 },
        { day: "Friday", subject: "Exam Revision", minutes: 30 },
        { day: "Saturday", subject: "Lab / Assignment", minutes: 30 },
        { day: "Sunday", subject: "Weekly Review", minutes: 30 }
    ],

    holiday: [
        { day: "Monday", subject: "DSA with C", minutes: 90 },
        { day: "Tuesday", subject: "Java", minutes: 90 },
        { day: "Wednesday", subject: "Web Technology", minutes: 90 },
        { day: "Thursday", subject: "COA + DCCN", minutes: 90 },
        { day: "Friday", subject: "DSA + Career Prep", minutes: 90 },
        { day: "Saturday", subject: "Portfolio Project", minutes: 90 },
        { day: "Sunday", subject: "Review + Blender", minutes: 90 }
    ]
};

const modeSelect = document.getElementById("mode");
const scheduleContainer = document.getElementById("schedule");
const progressText = document.getElementById("progress");

function renderSchedule() {
    const selectedMode = modeSelect.value;
    const tasks = schedules[selectedMode];

    scheduleContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("label");
        row.className = "task";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";

checkbox.addEventListener("change", function () {
    row.classList.toggle("completed", checkbox.checked);
    updateProgress();
});

const savedProgress = JSON.parse(
    localStorage.getItem(modeSelect.value) || "[]"
);

checkbox.checked = savedProgress[index] || false;

if (checkbox.checked) {
    row.classList.add("completed");
}


        const text = document.createElement("span");
        text.textContent =
            `${task.day}: ${task.subject} (${task.minutes} min)`;

        row.append(checkbox, text);
        scheduleContainer.appendChild(row);
    });

    updateProgress();
}

function updateProgress() {
    const checkboxes = scheduleContainer.querySelectorAll(
        'input[type="checkbox"]'
    );

    const completed = [...checkboxes].filter(box => box.checked).length;
    localStorage.setItem(
    modeSelect.value,
    JSON.stringify(
        [...checkboxes].map(box => box.checked)
    )
);

    progressText.textContent =
        `Completed: ${completed} / ${checkboxes.length}`;
}

modeSelect.addEventListener("change", renderSchedule);

renderSchedule();
const durationSelect = document.getElementById("timer-duration");
let timeLeft = Number(durationSelect.value) * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startButton.addEventListener("click", function () {
    if (timerInterval !== null) return;

    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session complete! Take a short break.");
        }
    }, 1000);
});

pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = Number(durationSelect.value) * 60;
    updateTimerDisplay();
});

updateTimerDisplay();
durationSelect.addEventListener("change", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = Number(durationSelect.value) * 60;
    updateTimerDisplay();
});

