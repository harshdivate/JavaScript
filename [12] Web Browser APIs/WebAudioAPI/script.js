const audio = document.querySelector('audio');
const play = document.getElementById('play');
const pause = document.querySelector('#pause')
const stop = document.querySelector('#stop')
const currentTime = document.querySelector('#current-time')
const volume = document.querySelector('#volume');




play.addEventListener('click',()=>{
    audio.play();
})

pause.addEventListener('click',()=>{
    audio.pause();
})

stop.addEventListener('click',()=>{
    audio.pause();
    audio.currentTime=0;
})

audio.addEventListener('timeupdate',()=>{
    currentTime.innerText = audio.currentTime;
})

volume.addEventListener('change',()=>{
    audio.volume = volume.value;
})