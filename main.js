// ----------------------------
// 🔹 VARIABLES
// ----------------------------
let startTime = 0;       // When stopwatch started
let elapsedTime = 0;     // Total elapsed time (in ms)
let timerInterval;       // Interval reference
let isRunning = false;   // Is stopwatch active or paused
let laps = [];           // Store lap times

// ----------------------------
// 🔹 ELEMENT REFERENCES
// ----------------------------
const display = document.querySelector("h1");     // The main display element
const lapsContainer = document.querySelector("ol"); // The lap list container

// ----------------------------
// 🔹 START / PAUSE FUNCTION
// ----------------------------
function startPause() {
  if (!isRunning) {
    // Start stopwatch
    startTime = Date.now() - elapsedTime; // Adjust if resuming
    timerInterval = setInterval(updateTime, 10); // Update every 10ms
    isRunning = true;
  } else {
    // Pause stopwatch
    clearInterval(timerInterval);
    isRunning = false;
  }
}

// ----------------------------
// 🔹 UPDATE TIME FUNCTION
// ----------------------------
function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// ----------------------------
// 🔹 FORMAT TIME FUNCTION
// ----------------------------
function formatTime(ms) {
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return (
    (hours ? String(hours).padStart(2, "0") + " : " : "") +
    String(minutes).padStart(2, "0") + " : " +
    String(seconds).padStart(2, "0") + " : " +
    String(milliseconds).padStart(2, "0")
  );
}

// ----------------------------
// 🔹 RESET FUNCTION
// ----------------------------
function reset() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  laps = [];
  display.textContent = "00 : 00 : 00";
  lapsContainer.innerHTML = "";
}

// ----------------------------
// 🔹 RECORD LAP FUNCTION
// ----------------------------
function recordLap() {
  if (!isRunning) return; // Only allow laps while running

  const lapTime = elapsedTime;
  laps.push(lapTime);

  const li = document.createElement("li");
  li.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  lapsContainer.appendChild(li);
}
