let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementById("test");
    if (content.style.display == "none"){
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
}

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
