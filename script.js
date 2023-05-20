let audio = document.getElementById('audio');
let input = document.getElementById('input');

audio.addEventListener('click',()=>{
    input.click();
})
// input.addEventListener('select',()=>{
    // let playSong = input.value
    // playSong.play()
    // console.log(playSong)

// })
input.onchange = () => {
  const selectedFile = input.files[0];
  console.log(selectedFile);
  console.log(selectedFile.name);
}