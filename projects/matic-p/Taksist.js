var playerSpeed = 0;
var playerX = 0;
var playerY = 1;
var playerZ = 0;
var dir = 0;
var isGravityOn = 0;
var gravity = 9.81;
var timeFalling = 0;
var isOnFoot = 0;
var accelerationInPlane = 40;
var accelerationInCar = 600;
var decceleration = 2000;
var carImg;
var houseImg;
var roadImg;
var roadImg2;
var intersection;
GroundHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var laneWidth = 72;
var lineWidth = 10.5;
var segmentLength = 200
var camX = 0;
var camZ = 0;
// 3800 2600
var missionTriggerXYXY = {x: segmentLength * 19 , y: segmentLength * 13, x2: segmentLength * 20, y2: segmentLength * 14};
var missionEnd = {xe: segmentLength * 7, ye: segmentLength * 2}
let lastTimestamp = null;
var canvas,ctx;

var roadImg2 = new Image();
roadImg2.src = "data/left.png";

var intersection = new Image();
intersection.src = "data/Breznaslova1.png";

var driveway = new Image();
driveway,src = "data/ConcreteFloor001.png";

var mapa = 
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    [16, 12, 17, 12, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [11, 0, 11, 0, 11, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 0, 0],
    [22, 0, 22, 0, 11, 0, 5, 16, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 12, 12, 12, 12, 12, 12, 15, 0, 0],
    [21, 0, 21, 0, 11, 0, 5, 11, 5, 11, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 5, 11, 5, 11, 5, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [21, 0, 21, 0, 11, 0, 5, 19, 12, 18, 5, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 0, 5, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [21, 0, 21, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 6, 0, 6, 6, 6, 6, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 6, 0, 0, 6, 6, 0, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [21, 0, 21, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [21, 0, 21, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [21, 0, 21, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [22, 0, 22, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [11, 0, 11, 0, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [11, 12, 13, 12, 11, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [21, 0, 21, 0, 0, 0, 0, 0, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [22, 0, 22, 0, 5, 5, 5, 5, 5, 11, 5, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [0, 0, 0, 5, 16, 12, 12, 12, 12, 18, 5, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [0, 0, 0, 5, 11, 5, 5, 5, 5, 11, 5, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [0, 0, 0, 5, 11, 5, 3, 0, 5, 11, 5, 0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [0, 0, 0, 5, 11, 3, 3, 0, 5, 11, 5, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 5, 11, 5, 5, 5, 5, 5, 5, 11, 0, 0],
    [0, 0, 0, 5, 11, 5, 3, 5, 5, 11, 5, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 5, 11, 12, 12, 12, 12, 12, 12, 11, 0, 0],
    [0, 5, 5, 5, 11, 5, 5, 5, 5, 11, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 11, 5, 5, 5, 5, 5, 5, 11, 5, 5],
    [0, 12, 12, 12, 13, 12, 12, 12, 12, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 12, 12, 12, 12, 12, 12, 13, 12, 12],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

var keyDown = {}
window.addEventListener("keydown", function(e) {
    keyDown[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", function(e) {
    keyDown[e.key.toLowerCase()] = false;
});


document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    carImg = document.createElement("img");
    carImg.src = "data/taxi.png";

    houseImg = new Image();
    houseImg.src = "data/house1.png";

    roadImg = new Image();
    roadImg.src = "data/road.png";

    requestAnimationFrame(gameLoop);
});


/*

function getGroundHeight(x, z) {
    const gridSize = Math.sqrt(GroundHeight.length);
    if (x >= 0 && z >= 0 && x < gridSize && z < gridSize) {
        let index = Math.round(z) * gridSize + Math.round(x);
        return GroundHeight[index];
    }
    return 0;
}
function executeGravity(deltaTime) {
    const groundHeight = getGroundHeight(playerX, playerZ);

    if (playerY > groundHeight) {
        isGravityOn = 1;
        timeFalling += deltaTime;
        playerY -= gravity * timeFalling * deltaTime;
        if (playerY < groundHeight) {
            playerY = groundHeight;
            timeFalling = 0;
            isGravityOn = 0;
        }
    } else {
        isGravityOn = 0;
        timeFalling = 0;
        playerY = groundHeight;
    }
}
*/
function movePlayer(deltaTime) {
    var apparentPlayerSpeed = playerSpeed / playerY;

    if (isOnFoot === 1) {
        if (keyDown.w) {
            playerSpeed = 50;
            camX += Math.abs(playerSpeed) * (Math.cos(dir)) * deltaTime;
            camZ += Math.abs(playerSpeed) * -(Math.sin(dir)) * deltaTime;              
        }
        if (keyDown.s) {
            playerSpeed -= accelerationInCar * deltaTime;
        }
        if (keyDown.a) {
            dir += 1.744 * deltaTime;
        }
        if (keyDown.d) {
            dir -= 1.744 * deltaTime;
        }
    }
    else
    {
        if (keyDown.w) {
            playerSpeed += accelerationInCar * deltaTime;           
        }
        if (keyDown.s) {
            if (playerSpeed > -500) {
                playerSpeed -= decceleration * deltaTime;
            }
        }
        if (keyDown.a) {
            dir += 1.744 * deltaTime;
        }
        if (keyDown.d) {
            dir -= 1.744 * deltaTime;
        }
        camX += apparentPlayerSpeed * (Math.cos(dir)) * deltaTime;
        camZ += apparentPlayerSpeed * -(Math.sin(dir)) * deltaTime;
        /*
        if (keyDown.e && playerSpeed > 350)
        {
            playerY += 0.1 * deltaTime
        }
        else
        {
            if (playerSpeed < 350 && playerY > 1)
            {
                playerY -= (1 / playerSpeed) * 15 * deltaTime
            }
        }
        

        if (keyDown.q && playerY > 1)
        {
            playerY -= 0.1 * deltaTime
        }
        /*
        if (keyDown.w === false && keyDown.s === false)
        {
            if (playerSpeed > 0) {
                playerSpeed -= 10 * deltaTime;
                if (playerSpeed < 0) playerSpeed = 0;
            } else if (playerSpeed < 0) {
                playerSpeed += 10 * deltaTime;
                if (playerSpeed > 0) playerSpeed = 0;
            }
        }
        */
    }
}

function gameLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    //segmentLength = 200 / playerY

    

    movePlayer(deltaTime);
    //executeGravity(deltaTime);

    //missionTrigger();

    //console.log(`X: ${playerX.toFixed(2)} Z: ${playerZ.toFixed(2)} Y: ${playerY.toFixed(2)} Dir: ${dir.toFixed(2)}`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //console.log("Player speed is " + playerSpeed * 0.28 + " km/h");
    
    drawRoads();
    
    missionTrigger();

    misionEnd();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    //ctx.fillText(`Position Y:${playerY.toFixed(1)} Speed:${Math.round(playerSpeed * 0.28).toFixed(1) + " km/h"} Direction:${dir.toFixed(1)}`, 10, 20);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center
    ctx.rotate(-dir + (Math.PI / 2)); // Rotate by direction (negative if needed)
    ctx.drawImage(
        carImg,
        -carImg.width / 2, // Center the image
        -carImg.height / 2
    );

    ctx.restore();

    requestAnimationFrame(gameLoop);
}

function drawRoads ()
{
    for (i = 0; i < mapa.length; i++)
    {
        for (j = 0; j < mapa[i].length; j++)
        {
            if (mapa[i][j] === 11)
            {
                /*
                ctx.fillStyle = "#000000ff";
                ctx.fillRect(j * segmentLength - camX, i * segmentLength - camZ, segmentLength, segmentLength);
                ctx.lineWidth = 10 / playerY;
                ctx.strokeStyle = "#ffe600ff";

                var mapaGor = mapa[i - 1] ? mapa[i - 1][j] : 0;
                var mapaDol = mapa[i + 1] ? mapa[i + 1][j] : 0;
                var mapaLevo = mapa[i][j - 1] ? mapa[i][j - 1] : 0;
                var mapaDesno = mapa[i][j + 1] ? mapa[i][j + 1] : 0;

                if (mapaGor === 1)
                {
                    ctx.beginPath ();
                    ctx.moveTo(j * segmentLength + segmentLength / 2 - camX, i * segmentLength + segmentLength / 2 - camZ);
                    ctx.lineTo(j * segmentLength + segmentLength /2 - camX, i * segmentLength - camZ);
                    ctx.closePath();
                    ctx.stroke();
                }
                if (mapaDol === 1)
                {
                    ctx.beginPath ();
                    ctx.moveTo(j * segmentLength + segmentLength / 2 - camX, i * segmentLength + segmentLength / 2 - camZ);
                    ctx.lineTo(j * segmentLength + segmentLength / 2 - camX, i * segmentLength + segmentLength - camZ);
                    ctx.closePath();
                    ctx.stroke();
                }
                if (mapaLevo === 1)
                {
                    ctx.beginPath ();
                    ctx.moveTo(j * segmentLength + segmentLength / 2 - camX, i * segmentLength + segmentLength / 2 - camZ)
                    ctx.lineTo(j * segmentLength - camX, i * segmentLength + segmentLength / 2 - camZ);
                    ctx.closePath();
                    ctx.stroke();
                }
                if (mapaDesno === 1)
                {
                    ctx.beginPath ();
                    ctx.moveTo(j * segmentLength + segmentLength / 2 - camX, i * segmentLength + segmentLength / 2 - camZ);
                    ctx.lineTo(j * segmentLength + segmentLength - camX, i * segmentLength + segmentLength / 2 - camZ);
                    ctx.closePath();
                    ctx.stroke();
                }
                */
                ctx.drawImage(
                    roadImg,
                    j * segmentLength - camX,
                    i * segmentLength - camZ,
                    segmentLength,
                    segmentLength
                );
            }
            if (mapa[i][j] === 21)
            {
                ctx.fillStyle = "#000000ff";
                ctx.fillRect(j * segmentLength - camX, i * segmentLength - camZ, segmentLength, segmentLength);
            }
            if (mapa[i][j] === 6)
            {
                ctx.fillStyle = "#221febff";
                ctx.fillRect(j * segmentLength - camX, i * segmentLength - camZ, segmentLength, segmentLength);
            }
            if (mapa[i][j] === 22)
            {
                ctx.fillStyle = "#000000ff";
                ctx.fillRect(j * segmentLength - camX, i * segmentLength - camZ, segmentLength, segmentLength);
                ctx.fillStyle = "white";
                ctx.fillRect(j * segmentLength + segmentLength / 5 - camX, i * segmentLength + segmentLength * 0.2 - camZ, segmentLength / 5, segmentLength * 0.6);
                ctx.fillRect(j * segmentLength + segmentLength / 5 * 3 - camX, i * segmentLength + segmentLength * 0.2 - camZ, segmentLength / 5, segmentLength * 0.6);
                //ctx.fillRect(j * segmentLength - camX, i * segmentLength - camZ, segmentLength, segmentLength);
            }
            if (mapa[i][j] === 5) {
                ctx.drawImage(
                    houseImg,
                    j * segmentLength - camX,
                    i * segmentLength - camZ,
                    segmentLength,
                    segmentLength
                );
            }
            if (mapa[i][j] === 12) {
                // Draw road rotated 90 degrees (π/2 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI / 2); // 90 degrees
                ctx.drawImage(
                    roadImg,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 15) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(0); // 0 degrees
                ctx.drawImage(
                    roadImg2,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 16) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI / -2); // 0 degrees
                ctx.drawImage(
                    roadImg2,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 13) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI / -2); // 0 degrees
                ctx.drawImage(
                    intersection,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 17) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI / 2); // 0 degrees
                ctx.drawImage(
                    intersection,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 18) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI); // 0 degrees
                ctx.drawImage(
                    intersection,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 19) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI); // 0 degrees
                ctx.drawImage(
                    roadImg2,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            if (mapa[i][j] === 3) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI); // 0 degrees
                ctx.drawImage(
                    driveway,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
            /*
            if (mapa[i][j] === 4) {
                // Draw road rotated 0 degrees (0 radians)
                ctx.save();
                ctx.translate(
                    j * segmentLength - camX + segmentLength / 2,
                    i * segmentLength - camZ + segmentLength / 2
                );
                ctx.rotate(Math.PI); // 0 degrees
                ctx.drawImage(
                    roadImg2,
                    -segmentLength / 2,
                    -segmentLength / 2,
                    segmentLength,
                    segmentLength
                );
                ctx.restore();
            }
                */
        }
    }
}

    /*
    ctx.fillStyle = "black";
    ctx.fillRect(120 - camX, 60 - camZ, segmentLength, laneWidth);
    ctx.fillStyle = "yellow";
    ctx.fillRect(120 - camX, 60 + laneWidth - camZ, segmentLength, lineWidth);
    ctx.fillStyle = "black";
    ctx.fillRect(120 - camX, 60 + laneWidth + lineWidth - camZ, segmentLength, laneWidth);
    ctx.fillStyle = "white";
    ctx.fillRect(120 + segmentLength - lineWidth - camX, 60 + laneWidth + lineWidth - camZ, lineWidth, laneWidth);
    ctx.fillStyle = "black";
    ctx.fillRect(120 + segmentLength - camX - 1, 60 - camZ, 2 * laneWidth + lineWidth, 2 * laneWidth + lineWidth);
    ctx.fillRect(120 + segmentLength - camX, 60 + 2 * laneWidth -1 + lineWidth - camZ, laneWidth, segmentLength);
    ctx.fillStyle = "yellow";
    ctx.fillRect(120 + segmentLength + laneWidth - camX, 60 + 2 * laneWidth + lineWidth - camZ, lineWidth, segmentLength);
    ctx.fillStyle = "black";
    ctx.fillRect(120 + segmentLength + laneWidth + lineWidth - camX, 60 + laneWidth + lineWidth - camZ, laneWidth, segmentLength + laneWidth);
    ctx.fillStyle = "white";
    ctx.fillRect(120 + segmentLength + laneWidth + lineWidth - camX, 60 + 2 * laneWidth + lineWidth + segmentLength - camZ, laneWidth, lineWidth);
    ctx.fillStyle = "white";
    ctx.fillRect(120 + segmentLength - camX, 60 + 2 * laneWidth + segmentLength - lineWidth, laneWidth, lineWidth);
    ctx.fillRect(120 - camX, 60 - camZ, lineWidth, laneWidth);
    */




function missionTrigger()
{

    if (camX < missionTriggerXYXY.x2 && camX > missionTriggerXYXY.x && camZ < missionTriggerXYXY.y2 && camZ > missionTriggerXYXY.y && playerY === 1)
    {
        ctx.fillText(`${"Pelji me do doma!"}`, 10, 20);
    }
    ctx.fillStyle = "#e5ff00ff";
    ctx.fillRect(missionTriggerXYXY.x - (camX) + 1000, missionTriggerXYXY.y - (camZ) + 400, missionTriggerXYXY.x2 - missionTriggerXYXY.x + 0, missionTriggerXYXY.y2 - missionTriggerXYXY.y + 0)
}

function misionEnd()
{

    if (camX < missionEnd.xe + segmentLength && camX > missionEnd.xe && camZ < missionEnd.ye + segmentLength && camZ > missionEnd.ye && playerY === 1)
    {
        ctx.fillText(`${"Na cilju smo!"}`, 10, 20);
        
    }
    ctx.fillStyle = "#1eff00ff";
        ctx.fillRect(missionEnd.xe - (camX), missionEnd.ye - (camZ) + 0, segmentLength, segmentLength + 0)
}