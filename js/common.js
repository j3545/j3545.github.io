
let sidebarOpen = false;

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
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


function getRandomBetweenTwoValues(min, max){
  var test = Math.random() * (max-min) + min;
  return test;
}
