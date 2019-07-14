let board = [];

let win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let player = 'X';

let isWin = false;

let btns = document.getElementsByClassName("btn");

function init(){
	for(let i = 0; i<btns.length; i++){
		btns[i].addEventListener('click', (evt)=>{
			handleClick(evt);
		});
		board.push(btns[i]);
	}
	getText();
}

function getText(){
	document.getElementById('player-text').innerHTML = player + "'s Turn";
}

//needs an evt from the click of the button
function handleClick(evt){
	//is there already something there?
	if(evt.target.innerHTML == 'X' || evt.target.innerHTML == 'O' || isWin == true){
		//do nothing
	}else{
		//what player is it? X or O
		let fillText = getPlayer();
		//change the text of the button
		evt.target.innerHTML = fillText;
		//change player
		checkWin();	
	}
}

function getPlayer(){
	return player;
}

function changePlayer(){
	if(player == 'X'){
		player = 'O' 
	}else{
		player = 'X'
	}
	document.getElementById('player-text').innerHTML = player + "'s Turn";
}

function checkWin(){
	//console.log('check win', player)
	let count = 0;
	for(let i = 0; i<win.length; i++){
		for(let j = 0; j<win[i].length; j++){
			if(board[win[i][j]].innerHTML == player){
				count++;				
			}
		}
		if(count == 3){
			gameover(player);
			return true;
		}else{
			count = 0;	
		}
	}
	//change player after checking if they won
	changePlayer();
}

//p for passed in player
function gameover(player){
	document.getElementById('player-text').innerHTML = player + " Won";
	document.getElementById('reset').addEventListener('click', ()=>{
		reset();
	});
	isWin = true;
}

function reset(){
	getText();
	isWin = false;
	for(let i= 0; i<board.length; i++){
		board[i].innerHTML = '';
	}
}

init();