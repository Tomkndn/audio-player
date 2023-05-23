// Adding Songs to the Playlist 
let songList = document.getElementById('playlist');
for (let i = 0; i < music_list.length; i++) {
    let list = document.createElement('li');
    list.innerText = `${music_list[i].name}`;
    songList.append(list);
}
// Removing songs to the playlist
let playList = document.querySelectorAll('li')
for (let i = 0; i < music_list.length; i++) {
    let list = playList[i].innerHTML
    playList[i].addEventListener('mouseenter', ()=>{
        playList[i].innerHTML+='<i class="fa-solid fa-trash"></i>';
        let trash = document.querySelector('.fa-trash');
        trash.addEventListener('click',()=>{
            // music_list.splice(i,1);
            playList[i].remove();
        })
    });
    playList[i].addEventListener('mouseleave', ()=>{
        playList[i].innerHTML=list;
    });
}