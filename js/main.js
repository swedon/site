var bgLogo = document.getElementById("bg-logo");
var bgVideo = document.getElementById("bg-video");
var sourceElements = bgVideo.querySelectorAll("source");
var videoSources = Array.from(sourceElements).map(source => source.getAttribute("src"));
var currentIndex = 0;
var isPlaying = false;
var canPlayWebm = bgVideo.canPlayType('video/webm');


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playNextVideo() {
    if (isPlaying) {
        currentIndex = (currentIndex + 1) % videoSources.length;
    }
    bgVideo.src = videoSources[currentIndex];
    bgVideo.load();
    bgVideo.play().catch(error => {
        console.error("Autoplay prevented:", error);
    });
    isPlaying = true;
}

if (canPlayWebm !== 'probably') {
    videoSources = videoSources.filter(src => !src.endsWith('.webm'));
} else {
    videoSources = videoSources.filter(src => !src.endsWith('.mp4'));
}
shuffleArray(videoSources);

bgVideo.addEventListener("ended", playNextVideo);
if (!isPlaying) {
    playNextVideo();
}
