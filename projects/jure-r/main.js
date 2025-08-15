const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var doResize = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener("resize", doResize);
doResize();

var racuni = [
    { racun: 7+"*"+35, odgovor: 245 },
    { racun: 2+"+"+80, odgovor: 82 },
    { racun: 90+"+"+5, odgovor: 95 },
    { racun: 20+"+"+43, odgovor: 63 },
    { racun: 21+"+"+76, odgovor: 97 },
    { racun: 12+"+"+67, odgovor: 79 },
    { racun: 18+"+"+83, odgovor: 101 },
    { racun: 74+"+"+89, odgovor: 163 },
    { racun: 45+"+"+91, odgovor: 136 },
    { racun: 10+"*"+123, odgovor: 1230 },
    { racun: 70+"+"+305, odgovor: 375 },
    { racun: 221+"+"+70, odgovor: 291 },
    { racun: 97+"+"+51, odgovor: 148 },
    { racun: 40+"*"+43, odgovor: 1720 },
    { racun: 27+"+"+36, odgovor: 63 },
    { racun: 39+"*"+87, odgovor: 3393 },
    { racun: 18+"*"+83, odgovor: 1494 },
    { racun: 21+"+"+89, odgovor: 110 },
    { racun: 76+"+"+91, odgovor: 167 },
    { racun: 81+"*"+123, odgovor: 9963 },
    { racun: 70+"-"+305, odgovor: 235 },
    { racun: 221+"-"+70, odgovor: 151 },
    { racun: 97+"-"+51, odgovor: 46 },
    { racun: 40+"-"+43, odgovor: 3 },
    { racun: 27+"-"+36, odgovor: 9 },
    { racun: 39+"-"+87, odgovor: 48 },
    { racun: 18+"-"+83, odgovor: 65 },
    { racun: 21+"-"+89, odgovor: 68 },
    { racun: 76+"-"+91, odgovor: 15 },
    { racun: 81+"-"+123, odgovor: 42 },
];


document.getElementById("odgovor").onkeydown = function(e){
    //console.log(e)
    if (e.code == "Enter"){
        preveri();
    }
}

var u=0;
var racIdx, rac;
var timeoutId;



function novRacun(){
    document.getElementById("odgovor").value = "";
    racIdx = Math.floor(Math.random() * racuni.length);
    rac = racuni[racIdx];
    zacniStoparico();

   ctx.beginPath();
    ctx.fillStyle = "#748cab";
    ctx.fillRect(0, 0, canvas.width,canvas.height);
        
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#9a031e";
    ctx.fillText("racun je "+rac.racun,20, 85);
    console.log("racun je" +rac.racun)

}

function zacniStoparico(){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        preveri();
    },10000);
}

function ustaviStoparico(){
    clearTimeout(timeoutId);
    timeoutId=0;
}




function preveri(){
    ustaviStoparico();
    var odg = document.getElementById("odgovor").value
    console.log("odg",odg)

    if (rac.odgovor == odg){
        u++;

        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "#9a031e";
        ctx.fillText("score = "+u,1000,85);
        console.log("score = "+u)

        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "#9a031e";
        ctx.fillText("odgovor "+odg+" je pravilen",20,165);
        console.log("odgovor "+odg+" je pravilen")
    } else{
        u--;
        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "#9a031e";
        ctx.fillText("odgovor "+odg+" je napacen",20,165);
        console.log("odgovor "+odg+" je napacen")

        ctx.beginPath();
        ctx.font = "50px Arial";
        ctx.fillStyle = "#9a031e";
        ctx.fillText("score = "+u,1000,85);
        console.log("score = "+u)
 
    };
    
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#9a031e";
    ctx.fillText("pravilen odgovor je "+rac.odgovor,20,245);
    console.log("pravilen odgovor je "+rac.odgovor)

    setTimeout(() => {
        novRacun();
    }, 3000);
}


function odgovori(){
    preveri()

}



novRacun()

