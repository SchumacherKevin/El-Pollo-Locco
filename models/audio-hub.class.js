class AudioHub {
  static Intro = new Audio("audio/game/Pepé Peligroso.mp3");
  static StartGame = new Audio("audio/game/Pepe Intro 1.mp3");
  static CharacterDamage = new Audio("audio/character/characterDamage.mp3");
  static CharacterDead = new Audio("audio/character/characterDead.wav");
  static CharacterJump = new Audio("audio/character/characterJump.wav");
  static CharacterRun = new Audio("audio/character/characterRun.mp3");
  static CharacterSnoring = new Audio("audio/character/characterSnoring.mp3");
  static ChickenDead = new Audio("audio/chicken/chickenDead.mp3");
  static ChickenDead2 = new Audio("audio/chicken/chickenDead2.mp3");
  static BottleCollect = new Audio("audio/collectibles/bottleCollectSound.wav");
  static CoinCollect = new Audio("audio/collectibles/collectSound.wav");
  static EndbossApproach = new Audio("audio/endboss/endbossApproach.wav");
  static BottleBreak = new Audio("audio/throwable/bottleBreak.mp3");
  static allSounds = [
    AudioHub.Intro,
    AudioHub.StartGame,
    AudioHub.CharacterDamage,
    AudioHub.CharacterDead,
    AudioHub.CharacterJump,
    AudioHub.CharacterRun,
    AudioHub.CharacterSnoring,
    AudioHub.ChickenDead,
    AudioHub.ChickenDead2,
    AudioHub.BottleCollect,
    AudioHub.CoinCollect,
    AudioHub.EndbossApproach,
    AudioHub.BottleBreak,
  ];
  static isMuted = localStorage.getItem("isMuted") === "true";
  static autoplayBlocked = false;
  static originalVolume = 0.2;

  static {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = AudioHub.isMuted ? 0 : AudioHub.originalVolume;
      sound.muted = AudioHub.isMuted;
    });
  }

  playAudio(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.volume = AudioHub.isMuted ? 0 : AudioHub.originalVolume;
    sound.muted = AudioHub.isMuted;
    if (sound === AudioHub.StartGame) {
      sound.loop = true;
    }
    const playPromise = sound.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch((error) => {
        if (error.name === "NotAllowedError") {
          AudioHub.autoplayBlocked = true;
        }
        return null;
      });
    }
  }

  stopOneAudio(sound) {
    sound.pause();
    sound.currentTime = 0;
  }

  static toggleMute() {
    AudioHub.isMuted = !AudioHub.isMuted;
    localStorage.setItem("isMuted", AudioHub.isMuted);
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = AudioHub.isMuted ? 0 : AudioHub.originalVolume;
      sound.muted = AudioHub.isMuted;
    });
    return AudioHub.isMuted;
  }

  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}
