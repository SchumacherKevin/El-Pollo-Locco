const DEBUG = false;

const _activeIntervals = [];
const _origSetInterval = window.setInterval;
window.setInterval = function (fn, delay, ...args) {
  const id = _origSetInterval.call(window, fn, delay, ...args);
  _activeIntervals.push(id);
  return id;
};

/** Clears all active intervals registered since game start. */
function stopAllIntervals() {
  _activeIntervals.forEach((id) => clearInterval(id));
  _activeIntervals.length = 0;
}

/** Hides game UI and redraws the start screen, then plays the intro music. */
function returnToMenu() {
  AudioHub.stopAllSounds();
  stopAllIntervals();
  resetMenuButtons();
  drawStartImage(canvas.getContext("2d"));
  audioHub.playAudio(AudioHub.Intro);
}

/** Shows the start and settings buttons and hides the try-again button. */
function resetMenuButtons() {
  document.getElementById("tryAgainButton").style.display = "none";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("settingsButton").style.display = "block";
}

let canvas;
let world;
let keyboard = new Keyboard();
let audioHub = new AudioHub();

/**
 * Returns true if the device supports touch input.
 * @returns {boolean}
 */
function isTouchDevice() {
  return (
    /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Returns true if the device is a mobile device (touch or small screen).
 * @returns {boolean}
 */
function isMobileDevice() {
  return isTouchDevice() || window.innerWidth <= 900;
}

/** Shows or hides the portrait-mode overlay based on orientation. */
function checkOrientation() {
  const overlay = document.getElementById("portraitOverlay");
  if (isTouchDevice() && window.innerHeight > window.innerWidth) {
    overlay.classList.add("active");
  } else {
    overlay.classList.remove("active");
  }
}

/**
 * Draws the start screen image on the canvas and then shows the menu buttons.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
function drawStartImage(ctx) {
  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    showMenuButtons();
  };
}

/** Makes the start, settings, and fullscreen buttons visible. */
function showMenuButtons() {
  document.getElementById("startButton").style.display = "block";
  document.getElementById("settingsButton").style.display = "block";
}

/** Registers click listeners on all menu and settings buttons. */
function registerButtonListeners() {
  document.getElementById("startButton").addEventListener("click", startGame);
  document.getElementById("muteButton").addEventListener("click", (e) => { toggleMuteButton(); e.target.blur(); });
  document.getElementById("fullscreenButton").addEventListener("click", (e) => { toggleFullscreen(); e.target.blur(); });
  registerSettingsListeners();
}

/** Registers listeners for opening, closing, and clicking outside the settings overlay. */
function registerSettingsListeners() {
  document.getElementById("settingsButton").addEventListener("click", openSettings);
  document.getElementById("closeSettings").addEventListener("click", closeSettings);
  document.getElementById("settingsOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("settingsOverlay")) closeSettings();
  });
}

/** Initialises the canvas, draws the start image, and sets up all listeners. */
function showStartScreen() {
  canvas = document.getElementById("gameCanvas");
  if (!canvas) { console.error("Canvas not found"); return; }
  drawStartImage(canvas.getContext("2d"));
  updateMuteLabel();
  registerButtonListeners();
  setupMobileControls();
}

/**
 * Binds touch start/end/cancel events on a button element to a keyboard key.
 * @param {HTMLElement} el - The button element to bind.
 * @param {string} keyProp - The keyboard property name to set (e.g. "LEFT").
 */
function bindButton(el, keyProp) {
  const setKey = (value) => (e) => { e.preventDefault(); keyboard[keyProp] = value; };
  el.addEventListener("touchstart", setKey(true), { passive: false });
  el.addEventListener("touchend", setKey(false), { passive: false });
  el.addEventListener("touchcancel", setKey(false), { passive: false });
}

/** Binds all on-screen mobile control buttons to their keyboard equivalents. */
function setupMobileControls() {
  bindButton(document.getElementById("btnLeft"), "LEFT");
  bindButton(document.getElementById("btnRight"), "RIGHT");
  bindButton(document.getElementById("btnJump"), "SPACE");
  bindButton(document.getElementById("btnThrow"), "d");
}

/** Opens the settings overlay. */
function openSettings() {
  document.getElementById("settingsOverlay").classList.add("active");
}

/** Closes the settings overlay. */
function closeSettings() {
  document.getElementById("settingsOverlay").classList.remove("active");
}

/** Hides the start/settings buttons, plays the start sound, and initialises the game. */
function startGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("settingsButton").style.display = "none";
  audioHub.playAudio(AudioHub.StartGame);
  audioHub.stopOneAudio(AudioHub.Intro);
  init();
}

/** Toggles the global mute state and refreshes the mute button label. */
function toggleMuteButton() {
  AudioHub.toggleMute();
  updateMuteLabel();
}

/** Updates the mute button text to reflect the current mute state. */
function updateMuteLabel() {
  document.getElementById("muteButton").textContent = AudioHub.isMuted
    ? "🔇 Unmute"
    : "🔊 Mute";
}

/** Creates the canvas, initialises the level, and constructs the World. */
function init() {
  canvas = document.getElementById("gameCanvas");
  initLevel1();
  world = new World(canvas, keyboard);
}

/** Toggles between fullscreen and windowed mode. */
function toggleFullscreen() {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = true;
  if (event.key == "ArrowRight") keyboard.RIGHT = true;
  if (event.key == "ArrowUp") keyboard.UP = true;
  if (event.key == "ArrowDown") keyboard.DOWN = true;
  if (event.key == " ") keyboard.SPACE = true;
  if (event.key == "d") keyboard.d = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = false;
  if (event.key == "ArrowRight") keyboard.RIGHT = false;
  if (event.key == "ArrowUp") keyboard.UP = false;
  if (event.key == "ArrowDown") keyboard.DOWN = false;
  if (event.key == " ") keyboard.SPACE = false;
  if (event.key == "d") keyboard.d = false;
});

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

window.addEventListener("load", () => {
  setTimeout(checkOrientation, 500);
  showStartScreen();
  audioHub.playAudio(AudioHub.Intro);
});
