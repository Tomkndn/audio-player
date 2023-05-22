// Playlist Javascript
let songList = document.querySelectorAll('li')
for (let i = 0; i < 9; i++) {
    let list = songList[i].innerHTML
    songList[i].addEventListener('mouseover', ()=>{
        songList[i].innerHTML+='<i class="fa-solid fa-trash"></i>';
    });
    songList[i].addEventListener('mouseout', ()=>{
        songList[i].innerHTML=list;
    });
}
let trash = document.querySelector('.fa-trash');