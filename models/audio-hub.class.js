class AudioHub {
  static Intro = new Audio("audio/Pepé Peligroso.mp3");
  static StartGame = new Audio("audio/Pepe Intro 1.mp3");
  static allSounds = [AudioHub.Intro, AudioHub.StartGame];
  static isMuted = false;
  static autoplayBlocked = false;
  static originalVolume = 0.2;

  static {
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = 0.2;
    });
  }

  playAudio(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.volume = 0.2;
    if (sound === AudioHub.Intro) {
      sound.loop = true;
    }
    sound.muted = false;
    const playPromise = sound.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((error) => {
        if (error.name === 'NotAllowedError') {
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
    AudioHub.allSounds.forEach((sound) => {
      if (AudioHub.isMuted) {
        sound.volume = 0;
      } else {
        sound.volume = AudioHub.originalVolume;
      }
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
