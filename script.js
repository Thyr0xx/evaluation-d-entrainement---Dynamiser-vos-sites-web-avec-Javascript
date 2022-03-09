var globalScore, roundScore, playerTurn, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		// mise en place d'un numéro aléatoire en 1 et 6
		var dice = Math.floor(Math.random()*6)+1;
		// affichage du numéro de dé
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice +'.png';
		// réactuliser le roundScore si le numéro n'est pas 1
		if(dice !== 1){
			roundScore += dice;
			document.querySelector('#round-' + playerTurn).textContent = roundScore;
		}
		else {
				nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//ajout du roundScore vers le globalScore
		globalScore[playerTurn] += roundScore;
		//actualisation de l'interface des scores
		document.querySelector('#score-' + playerTurn).textContent = globalScore[playerTurn];
		//verif si un joueur a atteint 100 ou plus
		if (globalScore[playerTurn] >= 100) {
			document.querySelector('#name-' + playerTurn).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + playerTurn + '-panel').classList.add('winner');
			document.querySelector('.player-' + playerTurn + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else {
			nextPlayer();
		}
		
	}
});

//on va créer maintenant la fonction nextPlayer
function nextPlayer(){
	playerTurn === 0 ? playerTurn = 1 : playerTurn = 0;
	roundScore = 0;
	document.getElementById('round-1').textContent = '0';
	document.getElementById('round-2').textContent = '0';
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.player-2-panel').classList.toggle('active');
	document.querySelector('.dice').style.display ='none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	globalScore = [0, 0];
	playerTurn = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('score-2').textContent = '0';
	document.getElementById('round-1').textContent = '0';
	document.getElementById('round-2').textContent = '0';
	document.getElementById('name-1').textContent = 'player 1';
	document.getElementById('name-2').textContent = 'player 2';
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-2-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-2-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.add('active');
}