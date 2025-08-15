// Spremenljivke
var canvas, ctx;
var name;
var LP = 1;
var level = 1;
var knives = 4 + level;
var angle = 0;
var Throw = false;
var knifeSpeed = 30;
var knifeY = 10;
var stuckKnives = [];
var gameStarted = false;
var over = false;
var waitingForNextLevel = false;
var skinz = false;
var inputLocked = false;
var currWood = "Default"
var currKnife = "Default"
var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
var knifeSelecting = false;

window.addEventListener("DOMContentLoaded", function (e) {
  init();
});
function init() {
  // Poskrbimo za pravilno raztegovanje okna
  var doResize = function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", doResize);
  doResize();

  // Prisluhni spremembam miške
  document.addEventListener("mousedown", handleMouseDown);
  
  // Pripravi canvas in 2d kontekst
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // Pripravi slike
  woodImg = document.createElement("img");
  woodImg.src = "images/wood.png";
  knifeImg = document.createElement("img");
  knifeImg.src = "images/knife.png";
  levelClearedImg = document.createElement("img");
  levelClearedImg.src = "images/level.png";
  joverImg = document.createElement("img");
  joverImg.src = "images/gameOver.png";
  naslovImg = document.createElement("img");
  naslovImg.src = "images/naslov.png";
  playImg = document.createElement("img");
  playImg.src = "images/play.png";
  skinsImg = document.createElement("img");
  skinsImg.src = "images/skins.png";
  restartImg = document.createElement("img");
  restartImg.src = "images/restart.png";
  cheeseLogImg = document.createElement("img");
  cheeseLogImg.src = "images/CHEESE.png";
  wood2Img = document.createElement("img");
  wood2Img.src = "images/wood2.png";
  lollyLogImg = document.createElement("img");
  lollyLogImg.src = "images/lolly.png";
  backImg = document.createElement("img");
  backImg.src = "images/back.png";
  woodDefaultImg = document.createElement("img");
  woodDefaultImg.src = "images/wood.png";
  knifeSelectImg = document.createElement("img")
  knifeSelectImg.src = "images/select.png"
  knife2Img = document.createElement("img")
  knife2Img.src = "images/knife2.png"
  knifeDefaultImg = document.createElement("img")
  knifeDefaultImg.src = "images/knife.png"
  knifePurpImg = document.createElement("img")
  knifePurpImg.src = "images/knifePurp.png"
  knifeSwordImg = document.createElement("img")
  knifeSwordImg.src = "images/knife3.png"
  knifeBlueImg = document.createElement("img")
  knifeBlueImg.src = "images/knifeBlue.png"
  
  drawStartScreen();
}
function drawScoreboard() {
  ctx.fillStyle = "#FF714B";
  ctx.font = "bold 25px Verdana";
  ctx.fillText("Top scores", 20, 50);
  ctx.fillStyle = "#FFF0C4"
  scoreboard.forEach((entry, index) => {
    ctx.fillText(`${index + 1}. ${entry.name} - Level ${entry.level}`, 20, 100 + index * 50);
  })
}
function skins() {
  console.log("Skins!")
  skinz = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(skinsImg, canvas.width / 3, 10, 354 * 1.5, 144 * 1.2);
  ctx.drawImage(woodDefaultImg, 80, 350, 250, 250);
  ctx.drawImage(wood2Img, 450, 350, 250, 250);
  ctx.drawImage(cheeseLogImg, 820, 350, 250, 250);
  ctx.drawImage(lollyLogImg, 1190, 350, 250, 250);
  ctx.drawImage(knifeSelectImg, canvas.width - 446 / 1.75 - 25, canvas.height - 200 / 1.75 - 10, 446 / 1.75, 200 / 1.75)
  ctx.fillStyle = "#c77dff";
  ctx.font = "bold 50px elephant";
  ctx.fillText("Default", 80 + 30, 675);
  ctx.fillText("Gear", 450 + 50, 675);
  ctx.fillText("Cheese", 820 + 40, 675);
  ctx.fillText("Lollypop", 1190 + 15, 675);
  ctx.fillStyle = "#3F72AF";
  ctx.fillText("Currentlly selected: " +currWood, 400, 800);
}
function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playImg, 150, 375, 734 / 1.5, 403 / 1.5);
  ctx.drawImage(naslovImg, canvas.width / 5, 50, 607 * 1.5, 102 * 1.5);
  ctx.drawImage(skinsImg, canvas.width / 2, 430, 354 * 1.5, 114 * 1.5);
  ctx.drawImage(knifeImg, canvas.width / 1.84, 25, 73 / 1.5, 335 / 1.5);
  ctx.drawImage(woodImg, -100, canvas.height - 200, 350, 350)
  ctx.fillStyle = "#0ABAB5";
  ctx.font = "bold 70px bodoni mt";
  ctx.fillText("Level: " +level, canvas.width / 2.5, 350);
  gameStarted = false;
  Throw = false;
  drawScoreboard()
}
function knifeSelect() {
  knifeSelecting = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(skinsImg, canvas.width / 3, 10, 354 * 1.5, 144 * 1.2);
  ctx.drawImage(knifeDefaultImg, 80, 350, 73 / 1.2, 335 / 1.2);
  ctx.drawImage(knifeSwordImg, 380, 350, 310 / 3.5, 980 / 3.5);
  ctx.drawImage(knife2Img, 720, 340, 30 * 1.4, 207 * 1.4);
  ctx.drawImage(knifePurpImg, 1035, 340, 87 / 1.1, 325 / 1.1);
  ctx.drawImage(knifeBlueImg, 1335, 335, 45 * 1.5, 206 * 1.5);
  ctx.fillStyle = "#c77dff";
  ctx.font = "bold 50px elephant";
  ctx.fillText("Default", 80 - 60, 680);
  ctx.fillText("Sword", 380 - 40, 680);
  ctx.fillText("Green", 720 - 60, 680);
  ctx.fillText("Purple", 1035 - 50, 680);
  ctx.fillText("Blue", 1335 - 30, 680);
  ctx.fillStyle = "#3F72AF";
  ctx.fillText("Currentlly selected: " +currKnife, 400, 800);
}
function handleMouseDown(e) {
  // Tipka na miski je bila pritisnjena
  if (inputLocked) return;
  if (!gameStarted && !over && !skinz) {
    // start screen
    if (e.clientX >= 150 && e.clientX <= 150 + 734 / 1.5 &&
        e.clientY >= 375 && e.clientY <= 375 + 403 / 1.5) {
      gameStarted = true;
      loop();
      return;
    }
    if (e.clientX >= canvas.width / 2 && e.clientX <= canvas.width / 2 + 354 * 1.5 &&
        e.clientY >= 420 && e.clientY <= 420 + 114 * 1.5) {
      skins();
      return;
    }
    return;
  }
  if (skinz && !knifeSelecting) {
    if (e.clientX >= 80 && e.clientX <= 80 + 250 &&
        e.clientY >= 350 && e.clientY <= 350 + 250) {
          woodImg.src = "images/wood.png";
          currWood = "Default";
          skinz = false;
          drawStartScreen();
          lockInputFor(2);
          return
        }
    if (e.clientX >= 450 && e.clientX <= 450 + 250 &&
        e.clientY >= 350 && e.clientY <= 350 + 250) {
          woodImg.src = "images/wood2.png";
          currWood = "Gear";
          skinz = false;
          drawStartScreen();
          lockInputFor(2);
          return
        }
    if (e.clientX >= 820 && e.clientX <= 820 + 250 &&
        e.clientY >= 350 && e.clientY <= 350 + 250) {
          woodImg.src = "images/CHEESE.png";
          currWood = "Cheese";
          skinz = false;
          drawStartScreen();
          lockInputFor(2);
          return
        }
    if (e.clientX >= 1190 && e.clientX <= 1190 + 250 &&
        e.clientY >= 350 && e.clientY <= 350 + 250) {
          woodImg.src = "images/lolly.png";
          currWood = "Lollypop";
          skinz = false;
          drawStartScreen();
          lockInputFor(2);
          return;
        }
    if (e.clientX >= canvas.width - 446 / 1.75 - 25 && e.clientX <= canvas.width - 446 / 1.75 - 25 + 446 / 1.75 &&
        e.clientY >= canvas.height - 200/ 1.75 - 10 && e.clientY <= canvas.height - 200 / 1.75 - 10 + 200 / 1.75) {
          knifeSelect()
        }
  }
  if (skinz && knifeSelecting) {
    if (e.clientX >= 80 && e.clientX <= 80 + 73 / 1.2 && // 80, 350, 73 / 1.2, 335 / 1.2);
        e.clientY >= 350 && e.clientY <= 350 + 335 / 1.2) {
      knifeImg.src = "images/knife.png";
      skinz = false;
      knifeSelecting = false;
      currKnife = "Default"
      drawStartScreen();
      lockInputFor(2);
      return;
    }
    if (e.clientX >= 380 && e.clientX <= 380 + 310 / 3.5 &&
        e.clientY >= 350 && e.clientY <= 350 + 980 / 3.5) {
      knifeImg.src = "images/knife3.png"
      skinz = false;
      knifeSelecting = false;
      currKnife = "Sword"
      drawStartScreen();
      lockInputFor(2);
      return;
    }
    if (e.clientX >= 720 && e.clientX <= 720 + 30 * 1.4 && // 720, 350, 30 * 1.4, 207 * 1.4
        e.clientY >= 350 && e.clientY <= 350 + 350 * 1.4) {
      knifeImg.src = "images/knife2.png"
      skinz = false;
      knifeSelecting = false;
      currKnife = "Green"
      drawStartScreen();
      lockInputFor(2);
      return;
    }
    if (e.clientX >= 1035 && e.clientX <= 1035 + 87 / 1.1 && // 1035, 340, 87 / 1.1, 325 / 1.1
        e.clientY >= 340 && e.clientY <= 340 + 325 / 1.1) {
      knifeImg.src = "images/knifePurp.png"
      skinz = false;
      knifeSelecting = false;
      currKnife = "Purple"
      drawStartScreen();
      lockInputFor(2);
      return;
    }
    if (e.clientX >= 1335 && e.clientX <= 1335 + 45 * 1.5 && // 1335, 350, 45 * 1.5, 206 * 1.5
        e.clientY >= 350 && e.clientY <= 350 + 206 * 1.5) {
      knifeImg.src = "images/knifeBlue.png"
      skinz = false;
      knifeSelecting = false;
      currKnife = "Blue"
      drawStartScreen();
      lockInputFor(2);
      return;
    }
  }

  if (waitingForNextLevel) {
    waitingForNextLevel = false;
    knives = 4 + level;
    stuckKnives = [];
    knifeY = 10;
    Throw = false;
    loop();
    return;
  }

  if (over) {
    LP = 1;
    level = 1;
    knives = 4 + level;
    stuckKnives = [];
    knifeY = 10;
    Throw = false;
    over = false;
    gameStarted = false;
    drawStartScreen();
    return;
  }

  if (gameStarted) {
    // back button
    if (e.clientX >= 10 && e.clientX <= 60 &&
        e.clientY >= canvas.height - 60 && e.clientY <= canvas.height + 50) {
          console.log("Back");
          backButtonClicked = false;
          gameStarted = false;
          Throw = false;
          inputLocked = false;
          stuckKnives = [];
          knives = level + 4;
          drawStartScreen();
          return;
    }
    // restart button
    if (e.clientX >= canvas.width - 70 && e.clientX <= canvas.width - 70 + 50 &&
        e.clientY >= canvas.height - 60 && e.clientY <= canvas.height - 10) {
      console.log("Restart");
      knives = 4 + level;
      stuckKnives = [];
      knifeY = 10;
      Throw = false;
      angle = 0;
      over = false;
      return;
      }
  }  

  if (!Throw && knives > 0) {
    Throw = true;
    knifeY = 10;
  }
}
function lockInputFor(ms) {
  inputLocked = true;
  setTimeout(() => inputLocked = false, ms);
}

function wwin() {
  console.log("win");
  level++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  ctx.drawImage(levelClearedImg, 0, 0, canvas.width, canvas.height);
  lockInputFor(200);
  waitingForNextLevel = true;
}

function jover() {
  console.log("jover");
  over = true;
  scoreboard.push({name: name, level: level });
  scoreboard.sort((a, b) => b.level - a.level);
  if (scoreboard.length > 5) scoreboard.length = 5;
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  ctx.drawImage(joverImg, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#74c69d";
  ctx.font = "bold 50px forte";
  ctx.fillText("You reached level: "+level, canvas.width / 2.7, 50);
  lockInputFor(100);

}
function loop() {
  if (name == "") {
    name = prompt("Type in your username")
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(naslovImg, 5, 5, 607, 102);
  ctx.drawImage(backImg, 10, canvas.height - 60, 50, 50);
  ctx.drawImage(restartImg, canvas.width - 70, canvas.height - 60, 50, 50);
  let woodX = 600;
  let woodY = 400;
  let woodW = 255;
  let woodH = 255;
  let knifeW = 73 / 2;
  let knifeH = 335 / 2;
  angle += 0.06 + (level / 500);

  ctx.save();
  ctx.translate(woodX + woodW / 2, woodY + woodH / 2);
  ctx.rotate(angle);

  stuckKnives.forEach(a => {
    ctx.save();
    ctx.rotate(a);
    let inset = 80;
    ctx.drawImage(knifeImg, -knifeW / 2, -woodH / 2 - knifeH + inset, knifeW, knifeH);
    ctx.restore();
  });

  ctx.drawImage(woodImg, -woodW / 2, -woodH / 2, woodW, woodH);
  ctx.restore();

  if (Throw) {
  knifeY += knifeSpeed;
  if (knifeY >= 300) {
    let impactAngle = ((-angle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    let collision = false;
    for (let stuckAngle of stuckKnives) {
      let diff = Math.abs(impactAngle - stuckAngle);
      diff = Math.min(diff, 2 * Math.PI - diff);
      if (diff < 0.2) {
        collision = true;
        break;
      }
    }

    if (collision) {
      console.log("collision");
      LP--;
      jover();
      return(loop);
    } else {
      knives--;
      stuckKnives.push(impactAngle);
    }

    Throw = false;
    knifeY = 10;
  }
}
  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  if (Throw || (!Throw && knives > 0)) {
    ctx.drawImage(knifeImg, 705, knifeY, 73 / 2, 335 / 2);
  }
  if (knives < 1 && LP > 0) {
    wwin();
  } else {
    requestAnimationFrame(loop);
  }
  if (!waitingForNextLevel) {
    ctx.fillStyle = "#b5e2fa";
    ctx.font = "bold 50px forte";
    ctx.fillText("Noži: "+knives, canvas.width - 200, 50);
    ctx.fillText("Življenja: "+LP, canvas.width - 292.5, 110);
    ctx.fillText("Level: "+level, canvas.width - 200, 170);
  }
}