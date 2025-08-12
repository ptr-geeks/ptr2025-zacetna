// Spremenljivke
var mouse = { x: 0, y: 0, pressed: false };
var keyboard = {};
var canvas, ctx;
var minionImgs = [];
var bgImg;

var sounds = {
  wee: new Audio("data/wee.mp3")
};
sounds.wee.loop = false;

var bgcolor = 0;
var tocke = 0;
var fc = 0;

var topx = 400;
var topy = 100;

var minions = [];

var mapa = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var squareSize = 100;


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
  for (var i = 0; i <= 2; i++) {
    minionImg = document.createElement("img");
    minionImg.src = "data/minion0"+i+".png";
    minionImgs.push(minionImg);
  }

  bgImg = document.createElement("img");
  bgImg.src = "data/logo.png";

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

function addMinion(x, y) {
  var imgIdx = Math.floor(Math.random() * minionImgs.length);
  minions.push({
    imgIdx: imgIdx,
    x: x - minionImgs[imgIdx].width/2,
    y: y - minionImgs[imgIdx].height/2,
    angle: Math.random() * Math.PI*2,
    avel: Math.random() * 1 -0.5,
    zoom: 0.9 + Math.random() * 0.1,
    vx: (Math.random())*20,
    vy: (Math.random())*20,
  });
  sounds.wee.play();
  //var s = new Audio("data/wee.mp3")
  //s.play();

}

function loop() {
  // Update
  if (mouse.pressed && fc % 1 == 0) {
    addMinion(mouse.x, mouse.y);
    /*
    addMinion(
      50 + Math.random()*(canvas.width -100),
      50 + Math.random()*(canvas.height -100)
    );
    */
  }

  for (var i = minions.length -1; i >= 0; i--) {
    var m = minions[i];
    m.angle += m.avel;
    m.zoom = m.zoom *0.95;
    m.x += m.vx *m.zoom;
    m.y += m.vy *m.zoom;
    if (m.zoom < 0.03) {
      minions.splice(i,1);
      setTocke(tocke +1);
    }
  }

  fc ++;

  // Ozadje
  //ctx.fillStyle = bgcolor ? "#FF6666": "#99FF99";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  for (var i = 0; i < mapa.length; i++) {
    for (var j = 0; j < mapa[i].length; j++) {
      if (mapa[i][j] == 0) {
        // Prazni kvadrat
        ctx.fillStyle = "#99FF99";
        ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
      }
      if (mapa[i][j] == 1) {
        // Cesta
        ctx.fillStyle = "gray";
        ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";

        var mapaGor = mapa[i-1] ? mapa[i-1][j] : 0;
        var mapaDol = mapa[i+1] ? mapa[i+1][j] : 0;
        var mapaLevo = mapa[i][j-1] ? mapa[i][j-1] : 0;
        var mapaDesno = mapa[i][j+1] ? mapa[i][j+1] : 0;

        if (mapaGor == 1) {
          ctx.beginPath();
          ctx.moveTo(j * squareSize +squareSize/2, i * squareSize +squareSize/2);
          ctx.lineTo(j * squareSize +squareSize/2, i * squareSize);
          ctx.closePath();
          ctx.stroke();
        }
        if (mapaDol == 1) {
          ctx.beginPath();
          ctx.moveTo(j * squareSize +squareSize/2, i * squareSize +squareSize/2);
          ctx.lineTo(j * squareSize +squareSize/2, i * squareSize +squareSize);
          ctx.closePath();
          ctx.stroke();
        }
        if (mapaLevo == 1) {
          ctx.beginPath();
          ctx.moveTo(j * squareSize +squareSize/2, i * squareSize +squareSize/2);
          ctx.lineTo(j * squareSize, i * squareSize +squareSize/2);
          ctx.closePath();
          ctx.stroke();
        }
        if (mapaDesno == 1) {
          ctx.beginPath();
          ctx.moveTo(j * squareSize +squareSize/2, i * squareSize +squareSize/2);
          ctx.lineTo(j * squareSize +squareSize, i * squareSize +squareSize/2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  // Set line width
  ctx.lineWidth = 10;

  /*
  // Wall
  ctx.strokeStyle = "#000000";
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
  */

  // Hair
  var ta = Math.atan2(mouse.x -topx, mouse.y -topy);
  if (ta > Math.PI*0.45) ta = Math.PI*0.45;
  if (ta < -Math.PI*0.45) ta = -Math.PI*0.45;
  var dx = Math.sin(ta) * 40;
  var dy = Math.cos(ta) * 40;
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#999999";

  for (var i = 0; i < 10; i++) {
    var px = i*20;
    ctx.beginPath();
    ctx.moveTo(topx +px, topy);
    ctx.lineTo(topx + dx +px, topy - dy);
    ctx.closePath();
    ctx.stroke();
  }

  

  // Test text
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("Točke: "+tocke, 10, 50);

  // Nariši Miniona
  for (var i = 0; i < minions.length; i++) {
    var m = minions[i];
    var img = minionImgs[m.imgIdx];
    var size = img.width*m.zoom;
    drawImageRotated(ctx, img, m.x, m.y, size, size, m.angle);
  }

  requestAnimationFrame(loop);
}