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

var currentClicks = 0;
const maxClicks = 2;


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

$(document).ready(function(){
	$(".restart").on("click", function(){
		deck = shuffle(deck);
		$(".card").children().each(function(index) {
			$(this).replaceWith("<i id = \"" + deck[index] + "\" class = \"fa fa-" + deck[index] + "\"></i>");
			$(".card").toggleClass("show",false);
			});
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
 	card.toggleClass("show");
 };

function addToCardCheck(card){
 	cardCheck.push(card.html());
}

function checkMatches() {
	if (cardCheck.length < 2) {
		if (cardCheck[0] === cardCheck[1]){
			matchedCards.push(cardCheck[0],cardCheck[1]);
			cardCheck.length = 0;
			console.log(matchedCards);
		}
	}
	else {
		cardCheck.length = 0;
	}
}

function hideCardSymbol(card){
	c.toggleClass("show", false);
}

function makeMove(){
	$(".card").click(function(e){
		showCardSymbol($(e.target));
		addToCardCheck($(e.target));
		checkMatches();
	});
}

makeMove();
/*checkMatches(cardCheck);*/
