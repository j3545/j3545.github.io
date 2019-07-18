let gameBtn = document.getElementsByClassName('games-btn')[0];
let nav = document.getElementsByClassName('nav')[0];

gameBtn.addEventListener('click', ()=>{    
    if(nav.style.display == "block"){
        nav.style.display = "none";
        gameBtn.innerHTML = "Show Games";
    }else{
        nav.style.display = "block";
        gameBtn.innerHTML = "Hide Games";
    }
});

