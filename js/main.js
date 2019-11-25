
let menu = document.getElementsByClassName("hamburger")[0];
let menuClone = menu.cloneNode(true);

let isNavOpened = false;

menuClone.addEventListener("click", function(){
    menuClone.classList.toggle("change");
    document.getElementById("myNav").style.height = "0%";
    isNavOpened = false;
});

document.getElementById("myNav").prepend(menuClone);

menu.addEventListener("click", function(){
    if(!isNavOpened){            
        menuClone.classList.toggle("change");
        menuClone.style.float = "right";
        document.getElementById("myNav").style.height = "100%";
        isNavOpened = true;
    }
});

function openNav() {
    document.getElementById("myNav").style.height = "80%";
  }
  
  function closeNav() {
    
  }
