let canvas;
let world;
let keyboard = new Keyboard();
let audioHub = new AudioHub();

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
  document
    .getElementById("muteButton")
    .addEventListener("click", toggleMuteButton);
  document
    .getElementById("fullscreenButton")
    .addEventListener("click", () =>
      toggleFullscreen(document.getElementById("gameContainer")),
    );
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

window.addEventListener("load", () => {
  showStartScreen();
  audioHub.playAudio(AudioHub.Intro);
});
