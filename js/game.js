const DEBUG = false;

let canvas;
let world;
let keyboard = new Keyboard();
let audioHub = new AudioHub();

function isTouchDevice() {
  return (
    /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

function isMobileDevice() {
  return isTouchDevice() || window.innerWidth <= 900;
}

function checkOrientation() {
  const overlay = document.getElementById("portraitOverlay");
  if (isTouchDevice() && window.innerHeight > window.innerWidth) {
    overlay.classList.add("active");
  } else {
    overlay.classList.remove("active");
  }
}

function showStartScreen() {
  canvas = document.getElementById("gameCanvas");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  const startImage = new Image();
  startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startImage.onload = function () {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    document.getElementById("startButton").style.display = "block";
    document.getElementById("settingsButton").style.display = "block";
    document.getElementById("fullscreenButton").style.display = "block";
  };

  updateMuteLabel();

  document.getElementById("startButton").addEventListener("click", startGame);
  document.getElementById("muteButton").addEventListener("click", (e) => {
    toggleMuteButton();
    e.target.blur();
  });
  document.getElementById("fullscreenButton").addEventListener("click", (e) => {
    toggleFullscreen(document.getElementById("gameContainer"));
    e.target.blur();
  });
  document
    .getElementById("settingsButton")
    .addEventListener("click", openSettings);
  document
    .getElementById("closeSettings")
    .addEventListener("click", closeSettings);
  document.getElementById("settingsOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("settingsOverlay"))
      closeSettings();
  });

  setupMobileControls();
}

function setupMobileControls() {
  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");
  const btnJump = document.getElementById("btnJump");
  const btnThrow = document.getElementById("btnThrow");

  function bindButton(el, keyProp) {
    el.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        keyboard[keyProp] = true;
      },
      { passive: false },
    );
    el.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        keyboard[keyProp] = false;
      },
      { passive: false },
    );
    el.addEventListener(
      "touchcancel",
      (e) => {
        e.preventDefault();
        keyboard[keyProp] = false;
      },
      { passive: false },
    );
  }

  bindButton(btnLeft, "LEFT");
  bindButton(btnRight, "RIGHT");
  bindButton(btnJump, "SPACE");
  bindButton(btnThrow, "d");
}

function openSettings() {
  document.getElementById("settingsOverlay").classList.add("active");
}

function closeSettings() {
  document.getElementById("settingsOverlay").classList.remove("active");
}

function startGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("settingsButton").style.display = "none";
  audioHub.playAudio(AudioHub.StartGame);
  audioHub.stopOneAudio(AudioHub.Intro);
  init();
}

function toggleMuteButton() {
  AudioHub.toggleMute();
  updateMuteLabel();
}

function updateMuteLabel() {
  document.getElementById("muteButton").textContent = AudioHub.isMuted
    ? "🔇 Unmute"
    : "🔊 Mute";
}

function init() {
  canvas = document.getElementById("gameCanvas");
  initLevel1();
  world = new World(canvas, keyboard);
}

function toggleFullscreen() {
  if (
    !document.fullscreenElement &&
    document.documentElement.requestFullscreen
  ) {
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
