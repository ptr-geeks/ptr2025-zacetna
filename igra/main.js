window.addEventListener("DOMContentLoaded", function(e) {
    init();
});

// Spremenljivke
var canvas, ctx;
var minionImg;
var mx = 0; //180;
var my = 190;

// Pripravi začetno stanje igre
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    minionImg = document.createElement("img");
    minionImg.src = "minion.png";

    window.addEventListener("mousemove", function(e) {
        mx = e.clientX;
        my = e.clientY;
    })

    loop();
}


function loop() {
    // Update


    // Draw
    ctx.fillStyle = "#99FF99";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set line width
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillStyle = "#000000";
    ctx.fillRect(130, 190, 40, 60);


    // Roof
    ctx.beginPath();
    ctx.lineTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();

    // Test text
    ctx.font = "bold 48px serif";
    ctx.fillText("Hi!", 10, 50);

    // Nariši Miniona
    ctx.drawImage(minionImg, mx -30, my -30, 60, 60);

    requestAnimationFrame(loop);
}