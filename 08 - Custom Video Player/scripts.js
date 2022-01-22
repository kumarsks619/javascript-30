// all required elements *******************************************************
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreenButton = player.querySelector('.fullscreenButton')

// functions *********************************************************************
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        if (player.requestFullscreen) player.requestFullscreen()
        else if (player.webkitRequestFullscreen) player.webkitRequestFullscreen()
        else if (player.msRequestFullScreen) player.msRequestFullScreen()
    }
}

// event listeners ***************************************************************
// play/pause
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

// play/pause button symbol
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// skip seconds
skipButtons.forEach((button) => {
    button.addEventListener('click', skip)
})

// volume and playback speed
ranges.forEach((range) => {
    range.addEventListener('change', handleRangeUpdate)
    range.addEventListener('mousemove', handleRangeUpdate)
})

// seeker
video.addEventListener('timeupdate', handleProgress)

let isSeekerHeld = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => (isSeekerHeld = true))
progress.addEventListener('mouseup', () => (isSeekerHeld = false))
progress.addEventListener('mousemove', (e) => isSeekerHeld && scrub(e))

// fullscreen
fullscreenButton.addEventListener('click', toggleFullscreen)
