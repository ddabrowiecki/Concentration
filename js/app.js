/*
 * Create a list that holds all of your cards
 */
var deck =
["diamond",
"paper-plane-o",
"anchor",
"bolt",
"cube",
"anchor",
"leaf",
"bicycle",
"diamond",
"bomb",
"leaf",
"bomb",
"bolt",
"bicycle",
"paper-plane-o",
"cube"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle cards upon clicking the restart element

function shuffleCards(){
	deck = shuffle(deck);
	$(".deck").children().each(function(index) {
		$(this).children().replaceWith("<li class=\"card " + deck[index] + "\"><i id = \"" + deck[index] + "\" class = \"fa fa-" + deck[index] + "\"></i></li>");
		$(".card").removeClass("show").removeClass("match");
	});
}

$(document).ready(function(){
	$(".restart").click(function(){
		shuffleCards();
	});
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var cardCheck = [];
var matchedCards = [];

function showCardSymbol(card){
 	card.addClass("show");
 };

function hideCardSymbol(card1,card2) {
	$(".card." + card1 + "").removeClass("show");
	$(".card." + card2 + "").removeClass("show");
	cardCheck.length = 0;
}

function addToCardCheck(card) {
	wholeCardClass = card.attr("class")
	wholeCardClass = wholeCardClass.split(" ");
 	cardCheck.push(wholeCardClass[1]);
}

function checkMatches(card1,card2) {
	card1 = cardCheck[0];
	card2 = cardCheck[1];
	if (card1 === card2){
		$(".card." + card1 + "").removeClass("show").addClass("match");
		matchedCards.push(card1,card2);
		cardCheck.length = 0;
	}
	else {
		setTimeout(function(){
			hideCardSymbol(card1,card2)
		},500);
	}
}

function movesCounter() {
	$(".card").click(function(){
		var i = 1;
		$(".moves").html(i);
		i++;
		return i;
	});
}

function congratsMessage(){
	if (matchedCards === 16){
		alert("Congratulations!")
	}
}

/*Make sure to set logic so that clicking the same card twice doesn't make you win*/

function makeMove(){
	$(".card").click(function(e){
		showCardSymbol($(e.target));
		addToCardCheck($(e.target));
		movesCounter();
		if (cardCheck.length === 2) {
			checkMatches();
		};
		congratsMessage();
	});
}

/*Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript*/

$(document).ready(function(){
	$(".card").click(function(){
	var sec = 0;
	    function pad ( val ) { return val > 9 ? val : "0" + val; }
	    setInterval( function(){
	        $("#seconds").html(pad(++sec%60));
	        $("#minutes").html(pad(parseInt(sec/60,10)));
	    }, 1000);
	});
})


makeMove();

/*if (matchedCard.length = 16) {
}
*/