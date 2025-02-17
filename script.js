const player = document.querySelector('.player')
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullScreenBtn = document.querySelector('.fullscreen');


// 2 
function showPlayIcon() {
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play'); 
}

// stp 1 Play / Pause-------------------->

function togglePlay() {
    if(video.paused){        
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','pause');
    }else {      
        video.pause();
        showPlayIcon();
       
    }
}
// On Video End Show PlayIcon
video.addEventListener('ended',showPlayIcon);

//  Progress Bar---------------------------->

// 4 calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
   
}


// 3 Update Progress bar as video plays
function updateProgress() {   
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)}/`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// 5 Click To Seek Within The Video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;

}

// Volume Controls------------------------------->

let lastVolume = 1;

// 6 Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //Rounding Volume  Up and Down
    if(volume < 0.1){
        volume = 0;
    }
    if(volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    console.log(volume);
    // change Icon Depending on  Volume
    volumeIcon.className = '';
    if(volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }else if(volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }else if(volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = value;

}
// 7 Mute / Unmute
function toggleMute() {
    // we want muteIcon when video width 0
    volumeIcon.className = '';
    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change PlayBack Speed--------------------------------->
// 8
function changeSpeed(){
    video.playbackRate = speed.value;
}

// FullScreen----------------------------------------------->
// 9
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }
// 10 toggle function 

let fullscreen = false;
function toggleFullscreen() {
    !fullscreen ? openFullscreen(player) :  closeFullscreen();   
        fullscreen = !fullscreen ;
}

// Event Listeners
playBtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('click',changeSpeed);
fullScreenBtn.addEventListener('click',toggleFullscreen)






