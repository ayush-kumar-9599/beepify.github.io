
let songIndex = 0;
let totalSongs = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Give-me-some-sunshine", filePath:"songs/1.mp3", coverPath:"covers/1.jpeg"},
    {songName:"Backbone", filePath:"songs/2.mp3", coverPath:"covers/2.jpeg"},
    {songName:"Lahore", filePath:"songs/3.mp3", coverPath:"covers/3.jpeg"},
    {songName:"Raataan Lambiya", filePath:"songs/4.mp3", coverPath:"covers/4.jpeg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
myProgressBar.addEventListener('click', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
function makeAllPlays(){
    Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 4){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
})
