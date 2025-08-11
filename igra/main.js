// Spremenljivke
var mouse = { x: 0, y: 0, pressed: false };
var keyboard = {};
var canvas, ctx;
var minionImg;
var mx = 0; //180;
var my = 190;
var bgcolor = 0;
var tocke = 0;

window.addEventListener("DOMContentLoaded", function (e) {
  init();
});

function init() {
  // Ta del kode se zazene na zacetku

  // Poskrbimo za pravilno raztegovanje okna
  var doResize = function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", doResize);
  doResize();

  // Prisluhni spremembam miške in tipkovnice
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  
  // Pripravi canvas in 2d kontekst
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Pripravi sliko minion
  minionImg = document.createElement("img");
  minionImg.src = "data/minion.png";

  // Naloži točke če obstajajo
  tocke = parseInt(localStorage.getItem("tocke"));
  if (isNaN(tocke)) tocke = 0;

  // Zazenemo glavno zanko programa
  loop();
}

function handleKeyDown(e) {
  // Tipka je bila pritisnena
  console.log("Tipka", e.key);
  keyboard[e.key] = true;
}
function handleKeyUp(e) {
  // Tipka je bila spuscena
  delete keyboard[e.key];
}

function handleMouseDown(e) {
  // Tipka na miski je bila pritisnjena
  console.log("MouseDown", e);
  mouse.pressed = true;

  // 130, 190, 40, 60
  if (mouse.x > 130 && mouse.x < 170 &&
      mouse.y > 190 && mouse.y < 250) 
  {
    setTocke(tocke +10);
    bgcolor = (bgcolor +1) % 2;
  }
}
function handleMouseMove(e) {
  // Miska se je premaknila
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
function handleMouseUp(e) {
  // Tipka na miski je bila spuscena
  mouse.pressed = false;
}

function setTocke(nTocke) {
  tocke = nTocke;
  localStorage.setItem("tocke", nTocke);
}

function loop() {
  // Update
  mx = mouse.x;
  my = mouse.y;

  // Ozadje
  ctx.fillStyle = bgcolor ? "#FF6666": "#99FF99";
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
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("Točke: "+tocke, 10, 50);

  // Nariši Miniona
  ctx.drawImage(minionImg, mx - 30, my - 30, 60, 60);

  requestAnimationFrame(loop);
}