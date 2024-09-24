// to show the input search

let searchIcon = document.querySelector(".heading .container .links ul li i");
let searchInput = document.querySelector(".heading .container .links input")

searchIcon.onclick = () => {
    searchInput.classList.toggle("open");
}

// toggle menu of links in small screens

let toggleMenu = document.querySelector(".heading .container .toggle-menu");
let mainLink = document.querySelector(".heading .container .links ul");
let falseIcon = document.querySelector(".heading .container .false");

toggle(toggleMenu,falseIcon)
toggle(falseIcon,toggleMenu)

// image slider to landing
document.querySelector(".landing .left").onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.querySelector(".landing .slide").appendChild(lists[0]);
}
document.querySelector(".landing .right").onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.querySelector(".landing .slide").prepend(lists[lists.length - 1]);
}

// function to toggle menu 
function toggle (menu1,menu2) {
    menu1.onclick = function () {
        mainLink.classList.toggle("open");
        this.classList.toggle("appear")
        menu2.classList.toggle("appear")
    }
}

// control the video
let containerVideo = document.querySelector(".video")
let video = document.querySelector(".video video");
let controlsBar = document.querySelector(".video .control")
let playVideo = document.querySelector(".video .play li:nth-child(2) i");
let infoVideo = document.querySelector(".video .info");
let progressAreaVideo = document.querySelector(".progress-area");
let progressBarVideo = document.querySelector(".video .progress-area .progress-bar"); 
let progressTimeVideo = document.querySelector(".video .progress-bar .target-time");
let currentTimeVideo = document.querySelector(".timeline .current-time");
let durationVideo = document.querySelector(".timeline .duration");
let backwardVideo = document.querySelector(".video .play .backward");
let forwardVideo = document.querySelector(".video .play .forward");
let volumeVideo = document.querySelector(".video .volume i");
let volumeRange = document.querySelector("input[type='range']");
let timer;

// show and hide the controlBar
let hideControlBar = () => { // if video paused, return 
    if(video.paused) return;
    timer = setTimeout(() => { // hide the controlBar after 3 seconds
        controlsBar.classList.add("hide") 
    },3000);
}

containerVideo.addEventListener("mousemove", () => { // show the controlBar on mousemove
    controlsBar.classList.remove("hide");
    clearTimeout(timer); // remove the setTimeout
    hideControlBar(); // calling hideControlBar
});


// play and pause the video
playVideo.addEventListener("click", () => {
    video.paused ? video.play() : video.pause();
    // hide the text during playing the video
    infoVideo.style.display = "none";
});

// if the video, play change the icon to pause
video.addEventListener("play", () => {
    playVideo.classList.replace("fa-play" , "fa-pause")
})

// if the video, pause change the icon to play
video.addEventListener("pause", () => {
    playVideo.classList.replace("fa-pause" , "fa-play")
})

// format the time of video to show him
let formatTime = (time) => {
    // getting the hours , minutes and hours
    let hours = Math.floor(time / (60 * 60))
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = Math.floor(time % 60);

    //adding 0 at beginning if the value is less than 10
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (hours == 0) {
        return `${minutes}:${seconds}`
    }

    return `${hours}:${minutes}:${seconds}`
}

// timeUpdate of the video
video.addEventListener("timeupdate" , e => {
    let {currentTime, duration} = e.target; // getting the currentTime of the video and his duration
    let percent = (currentTime / duration) * 100 // getting the percent 
    progressBarVideo.style.width = `${percent}%`; // passing the percentage as progressBar width
    currentTimeVideo.innerHTML = formatTime(currentTime); // passing the currentTime as videoCurrentTime text
});

// passing the videoDuration as videoDuration text

video.addEventListener("loadeddata", () => {
    durationVideo.innerHTML = formatTime(video.duration);
});

// control on the progressBar and timeLine
progressAreaVideo.addEventListener("click", e => {
    let progressWidth = progressAreaVideo.clientWidth; // getting the width of the progressAreaVideo
    video.currentTime = (e.offsetX / progressWidth) * video.duration; //update video currentTime
});

let draggableProgressBar = e => {
    let progressWidth = progressAreaVideo.clientWidth; // getting the width of the progressAreaVideo
    progressBarVideo.style.width = `${e.offsetX}px`; //passing offsetX value as progressBar width
    video.currentTime = (e.offsetX / progressWidth) * video.duration; //update video currentTime
    currentTimeVideo.innerHTML = formatTime(video.currentTime); // update videoCurrentTime upon on draggableProgressBar function
}

progressAreaVideo.addEventListener("mousedown", () => { // calling the function draggableProgressBar on the mousemove event
    progressAreaVideo.addEventListener("mousemove", draggableProgressBar);
});

document.addEventListener("mouseup", () => { // removing the function draggableProgressBar on the mousemove event
    progressAreaVideo.removeEventListener("mousemove", draggableProgressBar); 
});

// update the videoTime upon on the mousePosition
progressAreaVideo.addEventListener("mousemove", e => {
    progressTimeVideo.style.left = `${e.offsetX - 20}px`;
    let progressWidth = progressAreaVideo.clientWidth; // getting the width of the progressAreaVideo
    seeTimeVideo = (e.offsetX / progressWidth) * video.duration; //getting video currentTime
    progressTimeVideo.innerHTML = formatTime(seeTimeVideo); // passing video currentTime on the progressTimeVideo
});

// backward the video time
backwardVideo.addEventListener("click" , () => {
    video.currentTime -= 2; // subtract 2 seconds from the video 
});

// forward the video time
forwardVideo.addEventListener("click", () => {
    video.currentTime +=2; // add 2 seconds to the video 
});

// control the volume icon
volumeVideo.addEventListener("click", () => {
    if(volumeVideo.classList.contains("fa-volume-mute")) { // if the volume icon is muted
        volumeVideo.classList.replace("fa-volume-mute", "fa-volume-up")
        video.volume = 1; // passing 0.5 value as video volume
    } else {
        volumeVideo.classList.replace("fa-volume-up", "fa-volume-mute")
        video.volume = 0.0; // passing 0.0 value as video volume (video muted)
    }
    volumeRange.value = video.volume; // change the rangVolume according to the video volume
})

// control the volume range
volumeRange.addEventListener("input", e => {
    video.volume = e.target.value // passing the range as video volume
    if(e.target.value == 0) {
        volumeVideo.classList.replace("fa-volume-up", "fa-volume-mute")
    } else {
        volumeVideo.classList.replace("fa-volume-mute", "fa-volume-up")
    }
});

// show the social media in share icon
let share = document.querySelector(".video .share");
let social = document.querySelector(".video .social");

share.onclick = () => {
    social.classList.toggle("up")
}

// active the links upon on the scrolling
let mainLinks = document.querySelectorAll(".main-link");
let headerLinks = document.querySelectorAll(".heading ul li a");
let buttonToTop = document.querySelector(".top");

onscroll = () => {
    mainLinks.forEach((link) => { 
    let linksOffsetTop = link.offsetTop;

    if (scrollY >= linksOffsetTop - 200 ) {
        headerLinks.forEach((e) => {
            e.classList.remove("active");
        });
        document.querySelector(`[data-target=${link.id}]`).classList.add("active")
    }
    });

    // scroll to top
    if(scrollY >= 700) {
        buttonToTop.style.display = "block";
    } else {
        buttonToTop.style.display = "none";
    }
}

// rest of the scroll to top
buttonToTop.onclick = () => {
    scrollTo( {
        top:0,
        behavior:"smooth"
    })
}

// select particular work upon on his link
let linkWork = document.querySelectorAll(".work ul li a");
let imgWork = document.querySelectorAll(".images > div");

linkWork.forEach((link) => {
    link.onclick = (e) => {
        e.preventDefault();
        linkWork.forEach((e) => e.classList.remove("active"));
        e.target.classList.add("active");
        imgWork.forEach((e) => {
            e.classList.remove("show");
        })
        document.querySelectorAll(`.${e.target.dataset.select}`).forEach((e) => {
            e.classList.add("show");
        });
    }
});

// scroll to top
