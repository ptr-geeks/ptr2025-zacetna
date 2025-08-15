window.addEventListener("DOMContentLoaded", function(e) {
    document.addEventListener("mousemove",premikmiske);
    document.addEventListener("keydown",tipke);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click",klik)
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    priprava();
});

// Spremenljivke
var canvas, context;
var mousex = 0; 
var mousey = 0;
const angry = document.createElement("img");
angry.src = "slike/angry.png";
const gumb = document.createElement("img");
gumb.src="slike/zacni_gumb.png";
const trava= document.createElement("img");
trava.src="slike/trava2.png";
const zemlja= document.createElement("img");
zemlja.src="slike/zemlja.png";
const zaboj= document.createElement("img");
zaboj.src="slike/zaboj.png";
const motor=document.createElement("img");
motor.src="slike/motorzagume.png";
const kolo=document.createElement("img");
kolo.src="slike/kolo.png";
const deznik=document.createElement("img");
deznik.src="slike/deznik.png";
const cilj=document.createElement("img");
cilj.src="slike/cilj.png";
const skala=document.createElement("img");
skala.src="slike/skala.png"
const gora=document.createElement("img");
gora.src="slike/gora.png"
const tnt=document.createElement("img");
tnt.src="slike/tnt.png"
vy=0;
G=1;
mapx=0;
mapy=0;
walk=false;
var mx=0;
var my=0;
igra1Zacela=false;
d=0;
a=0;
zmaga=0;
konec=0;
mapa1=[
    [2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,0,0,0,0,0,0,0],
    [0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,2,3,2,2,2,0,0,0,0,0,0,0],
    [1,4,1,4,4,4,4,1,1,1,1,1,1,4,1,1,1,1,1,2,2,1,1,1,1,1,4,6,4,1]    
]
size = 50;

// Pripravi začetno stanje igre
function priprava() {
    zacetek();
}
//vse funkcije za tipke:
function tipke(event) {                                        //za tipke
    if (!igra1Zacela) return;
    if (event.key === "w" || event.key === "W") {
        console.log("skok");
        if(walk) vy=-10;
    }
    if (event.key===" "){
        console.log("double jump");
        if(walk) vy=-20;

    }
    if (event.key === "s" || event.key === "S") {
        console.log("dol");
    }
    if (event.key === "a" || event.key === "A") {
        console.log("levo");
        a = true;
    } else
    if (event.key === "d" || event.key === "D") {
        console.log("desno");
        d = true;
    }
}
function handleKeyUp(event) {
    if (!igra1Zacela) return;
    if (event.key === "a" || event.key === "A") {
        a = false;
    } else
    if (event.key === "d" || event.key === "D") {
        d = false;
    }

}
function premikmiske(e) {                                          //misko
        mx = e.clientX;
        my = e.clientY;
        //console.log(mx, my);
}

function klik() {
    if (!igra1Zacela && mx >=410  && mx <=610  && my >= 580 && my <= 650) {
        igra1Zacela = true;
        x=100;                                                      //////imagine da nisi vedu da so tle koordinate
        y=600;
        console.log(mapa1[mapy].length+"  , "+mapa1.length);
        level1(); 
    }
}
function narisiigralec(x,y){
    context.drawImage(angry, x, y, 50, 50);   //narise angry bird
}
    

function narisimapo(mapa){
    for(var i=0;i<mapa.length;i++){
        for(var j=0;j< mapa[i].length;j++){
            if (mapa[i][j]==1 || mapa[i][j]==4){
                if(mapa[i-1][j]==1 ) context.drawImage(zemlja,j*size, i*size, size, size); else {
                    context.drawImage(trava,j*size, i*size, size, size);
                } 
            }
            if (mapa[i][j]==3) context.drawImage(skala,j*size, i*size, size, size);
            if (mapa[i][j]==2) context.drawImage(gora,j*size, i*size, size, size);
            if (mapa[i][j]==6) context.drawImage(cilj,j*size, i*size, size, size);
        }
    }
}

function zacetek(){
    vy=0;
    G=1;
    mapx=0;
    mapy=0;
    walk=false;
    a = false;
    d = false;
    context.drawImage(gumb,300, 400 ,400, 400 );   
    //console.log("pritisni gumb:");                  //zacne z gumbom zacni( osnovna stran)
    if (!igra1Zacela) {
        requestAnimationFrame(zacetek);
    }
}

function level1() {     
    // Update

    //gravitacija
    if (vy<20) vy+=G;
    mapx=Math.floor(x/size);
    mapy=Math.floor(y/size);
    if (mapa1[Math.floor((y+vy)/size)][mapx]==0){
        y+=vy;
    }
    //gor
    mapx=Math.floor(x/size);
    mapy=Math.floor(y/size);
    if (mapy <= mapa1.length && mapa1[mapy+1][mapx]!=0){
        y=mapy*size;
        vy=0;
        walk=true;

    } else {
        walk=false;
    }
    //desno
    if (d && mapx+1 < mapa1[mapy].length && mapa1[mapy][mapx+1]==0){
        x+=5;
    } else { }
    //levo
    if (a && mapx-1 >= 0 && mapa1[mapy][mapx-1]==0){
        x-=5;
    } else { }

    

    
    

    

    // Draw
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    narisimapo(mapa1);

    narisiigralec(x,y);
    // konec igre

    //zmaga
    if (mapa1[mapy+1][mapx]==6){
        console.log("Cestitke, premagal si igro.");
        zmaga=zmaga+1;
        igra1Zacela = false;
        zacetek();
    }
    //izgubil
    mapx=Math.floor(x/size);
    mapy=Math.floor(y/size);
    if (mapa1[mapy+1][mapx]==4){
        context.drawImage(tnt,mapx*size, mapy*size, size, size );     
        konec=1;
    }else{}
    if (konec==0){requestAnimationFrame(level1);} else {
        console.log("Izgubil si na 1. levelu.");
        igra1Zacela = false;
        konec=0;
        zacetek();
    }
    
}