
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
