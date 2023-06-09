let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let upVolume = document.getElementById('upVolume')
let downVolume = document.getElementById('downVolume')
let mute = false
function upDownVolume(){
    downVolume.classList.toggle('fa-volume-down')
    upVolume.classList.toggle('fa-volume-up')
    upVolume.classList.toggle('fa-volume-xmark')
    downVolume.classList.toggle('fa-volume-xmark')
    volume_slider.style.backgroundColor = 'grey'
    if (mute) {
        mute = false
        curr_track.volume = volume_slider.value / 100
    }else{
        mute = true
        curr_track.volume = 0
    }
}

let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let music_list = [
    {
        name : 'Le_Le_Ram_Ram',
        music : 'Music/Le_Le_Ram_Ram.mp3'
    },
    {
        name : 'Safar',
        music : 'Music/Safar - Juss.mp3'
    },
    {
        name : 'Tu Maan Meri Jaan',
        music : 'Music/Tu Maan Meri Jaan.mp3'
    },
    {
        name : 'Tujh Pe Pyaar',
        music : 'Music/Tujh Pe Pyaar - Yo Yo Honey Singh.mp3'
    },
    {
        name : 'Zeda Nasha',
        music : 'Music/Zeda Nasha.mp3'
    },
    {
        name : 'Still Rollin',
        music : 'Music/Still Rollin.mp3'
    },
    {
        name : 'On Top',
        music : 'Music/On Top.mp3'
    },
    {
        name : '295',
        music : 'Music/295.mp3'
    },
    {
        name : 'Moon Rise',
        music : 'Music/Moon Rise.mp3'
    }

];

let audio = document.getElementById('audio');
// audio button is clicked
let audioUpload = document.getElementById("file");
audio.addEventListener('click',()=>{
    audioUpload.click()
})
// clicking input button
audioUpload.addEventListener("change", function() {
    uploadAudio(this);
});

let audioLink = document.getElementById('audioLink');
let audioSource = document.getElementById("audioSource");
let audioName;
// choosing audio files from device
function uploadAudio(input) {
    let reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function(e) {
            audioLink.setAttribute('data-value', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
        audioName = input.files[0].name
    }
}
// upload in the playlist
function play(element) {
    let musicSrc = element.getAttribute('data-value');
    music_list.unshift({name: `${audioName}`, music: `${musicSrc}`});
    track_index = 0
    loadTrack(track_index)
};

loadTrack(track_index);
// Loading Track
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    // playTrack()

    track_name.textContent = music_list[track_index].name;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}
// reseting all player
function reset(){
    curr_time.innerText = '00:00';
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
// checks random is active or not
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
// plays serial order
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
// plays random order
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
// repeats the current track
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
// play / pause track
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
// play track
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class = "fa fa-pause-circle fa-5x"></i>';
}
// pause track
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class = "fa fa-play-circle fa-5x"></i>';
}
// plays next track
function nextTrack() {
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index+=1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }
    else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
// plays previous track
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
// change seek value
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
// set volume slider 
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
// update timer 
function setUpdate(){
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes *60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if(durationSeconds < 10) {durationMinutes = "0" + durationMinutes;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
// change bgcolor randomly
function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 16);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to left top';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")fixed";
    document.body.style.background = gradient;
}
// export {music_list}; 