

const colorPicker = document.getElementById("colorPicker")
const canvaColor = document.getElementById("canvascolor")
const canvas = document.getElementById("mycanvas")
const clearButton = document.getElementById("clearbutton")
const saveButton =  document.getElementById("savebutton")
const retriveButton = document.getElementById("retrivebutton")
const fontPicker = document.getElementById("fontPicker")
const ctx = canvas.getContext('2d')
let isDrawing = false; // Variable declarations
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;

    }
});
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvaColor.addEventListener('change' , (e) =>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 500)
})

fontPicker.addEventListener('change' , (e)=>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click' ,() =>{
    ctx.clearRect(0,0,800, 500)
})

saveButton.addEventListener('click' ,()=>{
localStorage.setItem('canvasContents' , canvas.toDataURL())
let link = document.createElement('a')

link.download = 'my-canvas.png';

link.href = canvas.toDataURL();

link.click();
})

retriveButton.addEventListener('click' ,()=>{
    let savedCanvas = localStorage.getItem('canvasContents')

if(savedCanvas){
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img , 0,0)
}




})