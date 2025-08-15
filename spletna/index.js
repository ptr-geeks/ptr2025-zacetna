
var menuItems = document.getElementsByClassName("menuItem");
for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].onclick = function () {
    var pages = document.getElementsByClassName("page");
    for (var j = 0; j < pages.length; j++) {
      pages[j].style.display = "none";
    }
    var pg = document.getElementsByClassName(this.dataset.page);
    if (pg.length > 0) {
      pg[0].style.display = "block";
    }
  }
}

function izracunaj() {
  var racun = document.getElementById("racunInput").value;
  document.getElementById("zgodovina").innerHTML += "<br>"+racun;
  document.getElementById("racunInput").value = eval(racun);
}


// Ustvarimo gumbe za številke
for (var i = 0; i < 10; i++) {
  var gumb = document.createElement("input");
  gumb.type = "button";
  gumb.value = i;
  gumb.onclick = function() {
    document.getElementById("racunInput").value += this.value;
  }
  document.getElementById("gumbi").appendChild(gumb);
}

// Ustvarimo gumbe za operacije
var operacije = ["+", "-", "*", "/"];
for (var i = 0; i < operacije.length; i++) {
  var gumb = document.createElement("input");
  gumb.type = "button";
  gumb.value = operacije[i];
  gumb.onclick = function() {
    document.getElementById("racunInput").value += this.value;
  }
  document.getElementById("gumbi").appendChild(gumb);
}



var plavalci = [];
function posljiPlavalca() {
  var ime = document.getElementById("ime").value;
  var disc = document.getElementById("disc").value;
  //console.log(ime, disc);
  plavalci.push({ ime: ime, disc: disc });
  shraniPlavalce();
  //console.log(plavalci);
  prikaziTabeloPlavalcev();

  document.getElementById("ime").value = "";
  document.getElementById("disc").value = "";
}

function prikaziTabeloPlavalcev() {
  var tabela = document.getElementById("tabelaPlavalci");
  while (tabela.firstChild) {
    tabela.removeChild(tabela.firstChild);
  }

  var tr = document.createElement("tr");
  tabela.appendChild(tr);

  var td = document.createElement("td");
  td.innerHTML = "Ime";
  tr.appendChild(td);
  var td = document.createElement("td");
  td.innerHTML = "Disciplina";
  tr.appendChild(td);

  for (var i = 0; i < plavalci.length; i++) {
    var tr = document.createElement("tr");
    tabela.appendChild(tr);
    var td = document.createElement("td");
    td.innerHTML = plavalci[i].ime;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = plavalci[i].disc;
    tr.appendChild(td);
  }
}

function shraniPlavalce() {
  localStorage.setItem("plavalci", JSON.stringify(plavalci));
}

function naloziPlavalce() {
  var shranjeniPlavalci = localStorage.getItem("plavalci");
  if (shranjeniPlavalci) {
    plavalci = JSON.parse(shranjeniPlavalci);
  }
}

function izbrisiPlavalce() {
  plavalci = [];
  shraniPlavalce();
  prikaziTabeloPlavalcev();
}

naloziPlavalce();
prikaziTabeloPlavalcev();

var results = JSON.parse(localStorage.getItem("results"));
if (!results) results = [];


// var dist = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))