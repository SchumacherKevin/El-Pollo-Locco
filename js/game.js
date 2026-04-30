let canvas;
let world;
let keyboard = new Keyboard();
let audioHub = new AudioHub();

function showStartScreen() {
  canvas = document.getElementById("gameCanvas");
  if (canvas) {
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = function() {
      ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
      document.getElementById('startButton').style.display = 'block';
      document.getElementById('muteButton').style.display = 'block';
    };
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('muteButton').addEventListener('click', toggleMuteButton);
  } else {
    console.error('Canvas not found');
  }
}

function startGame() {
  document.getElementById('startButton').style.display = 'none';
  document.querySelector('h1').style.display = 'block';
  // document.querySelector('span').style.display = 'block';
  if (AudioHub.autoplayBlocked || AudioHub.Intro.paused) {
    audioHub.playAudio(AudioHub.Intro);
  }
  init();
}

function toggleMuteButton() {
  const muted = AudioHub.toggleMute();
  document.getElementById('muteButton').textContent = muted ? 'Unmute' : 'Mute';
  if (!muted && AudioHub.autoplayBlocked) {
    audioHub.playAudio(AudioHub.Intro);
  }
}

function init() {
  canvas = document.getElementById("gameCanvas");
  initLevel1();
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.key == " ") {
    keyboard.SPACE = true;
  }
  if (event.key == "d") {
    keyboard.d = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.key == " ") {
    keyboard.SPACE = false;
  }
  if (event.key == "d") {
    keyboard.d = false;
  }
});

window.addEventListener('load', () => {
  showStartScreen();
  audioHub.playAudio(AudioHub.Intro);
});
