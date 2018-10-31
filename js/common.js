/*
Old Nav Controls

let sidebarOpen = false;

function openNav() {
    document.getElementById("mySidenav").style.width = "10%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener("click", function(e){
  if(sidebarOpen == false){
    openNav();
    sidebarOpen = true;
  }else if(sidebarOpen == true){
    closeNav();
    sidebarOpen = false;
  }
});
*/

function getRandomBetweenTwoValues(min, max){
  var test = Math.random() * (max-min) + min;
  return test;
}

/*
  signature:
  adds my sig to a 2d context(c)
  c is a canvas context
*/
function signature(){
  if(typeof c !== 'undefined'){
    c.font="1vw Georgia";
    c.fillStyle = "rgba(255, 255, 255, 1)";
    c.textAlign = "center";
    c.fillText("Made by Jesus Quiroz :)", window.innerWidth*0.85, window.innerHeight*0.9);
  }
}
