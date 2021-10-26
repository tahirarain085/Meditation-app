const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  const replay = document.querySelector(".replay");
  // sounds

  const sounds = document.querySelectorAll(".sound-picker button");

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // timeDisplay

  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Get the length of outline

  const outlineLength = outline.getTotalLength();

  console.log(outlineLength);

  let fakeDurarion = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Play sound...

  const restartSong = (song) => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("ciao");
  };
  // Time Select...

  timeSelect.forEach((Option) => {
    Option.addEventListener("click", function () {
      fakeDurarion = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDurarion / 60)}:${Math.floor(
        fakeDurarion % 60
      )}`;
    });
  });
  // create a function specific to stop and play the sound...

  const checkPlaying = (song) => {
    console.log(song);
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  play.addEventListener("click", () => {
    checkPlaying(song);
  });
  replay.addEventListener("click", function () {
    restartSong(song);
  });

  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapased = fakeDurarion - currentTime;
    let seconds = Math.floor(elapased % 60);
    let mintus = Math.floor(elapased / 60);

    // animate the circle

    let progress = outlineLength - (currentTime / fakeDurarion) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${mintus}:${seconds}`;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDurarion) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
