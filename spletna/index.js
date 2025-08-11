
var menuItems = document.getElementsByClassName("menuItem");
for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].onclick = function() {
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