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
"cube"];

/*
List of global variables
*/

var numberClicks = 0;
var rating;
var sec;
var timerStart;
var cardCheck = [];
var matchedCards = [];

/*
Create a click counter to use for various functions
*/

function clickCounter() {
	$(".card").click(function(){
		numberClicks++;
		if(numberClicks % 2 === 0) {
			$(".moves").html(numberClicks / 2);
		}
		starRating();  // Star rating function below -- rating and star elements are based on number of clicks
	});
}

/*
Create star rating system to disappear incrementally the more moves a user makes
*/

var star1 = $(".stars").children()[0];
var star2 = $(".stars").children()[1];
var star3 = $(".stars").children()[2];

function starRating() {
	if (numberClicks < 28){
		rating = "3 -- Super Expert";  //Based on how many clicks a user makes before completion, they will be given a performance rating
	} else if (numberClicks >= 28 && numberClicks < 36) {
		star3.remove();
		rating = "2 -- Professional";
	} else if (numberClicks >= 36) {
		star1.remove();
		rating = "1 -- Novice";
	}
	return rating;
}

/*
The function below returns the star rating to its original state
*/

function returnStars() {
	$(".stars").append(star1,star2,star3);
}

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

/*
Shuffle cards and populate the shuffled symbols to reset the board
*/

function shuffleCards(){
	deck = shuffle(deck);
	$(".deck").children().each(function(index) {
		$(this).replaceWith("<li class=\"card " + deck[index] + "\"><i class = \"fa fa-" + deck[index] + "\"></i></li>");
	});
}

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

function showCardSymbol(card){
 	card.addClass("show");
 	card.addClass("disabled");  // This will ensure the card is not clickable when it is showed and is facing up.
}

function addToCardCheck(card) {  // Adds the identifying class of the selected card to an array
	var wholeCardClass;
	wholeCardClass = card.attr("class");
	wholeCardClass = wholeCardClass.split(" ");
 	cardCheck.push(wholeCardClass[1]);
}

function hideCardSymbol(card1,card2) {
	$(".card." + card1 + "").removeClass("show");
	$(".card." + card1 + "").removeClass("disabled");
	$(".card." + card2 + "").removeClass("show");
	$(".card." + card2 + "").removeClass("disabled");
	cardCheck.length = 0;
}

function checkMatches(card1,card2) {  //Verifies that the card classes in the array match -- if so, added to another array -- if not, card symbol is hidden
	card1 = cardCheck[0];
	card2 = cardCheck[1];
	if (card1 === card2){
		$(".card." + card1 + "").removeClass("show").addClass("match");
		matchedCards.push(card1,card2);
		cardCheck.length = 0;
	}
	else {
		setTimeout(function(){
			hideCardSymbol(card1,card2);
		},500);
	}
}

/*Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript*/

function timer() {
	$(".card").click(function(){
		if (numberClicks === 1){
			var sec = 0;
		    function pad (val) { return val > 9 ? val : "0" + val; }
		    timerStart = setInterval(function(){
		        $("#seconds").html(pad(++sec%60));
		        $("#minutes").html(pad(parseInt(sec/60,10)));
		    }, 1000);
		}
	});
	return $("#minutes").html() + " minutes and " + $("#seconds").html() + " seconds";
}

function stopTimer() {
	clearInterval(timerStart);
}

/*
Javascript for the modal from https://sabe.io/tutorials/how-to-create-modal-popup-box
*/

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
var againButton = document.querySelector(".again-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
    $(".time").html(timer());
    $(".rating").html(starRating());
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function refreshPage() {
	document.location.reload();
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
againButton.addEventListener("click", refreshPage);


/*
Alerts a modal with a final congratulations message and user stats
*/

function congratsMessage(){
	if (matchedCards.length === 16){
		setTimeout(function(){
			toggleModal();
			},1000);
		stopTimer();
	}
}

function restartGame(){ //Reset the board when clicking the restart element
	$(".restart").click(function(){
		shuffleCards();
		numberClicks = 0;
		matchedCards = [];
		$(".moves").html(0);
		stopTimer();
		$("#minutes").html("");
		$("#seconds").html("");
		$(".card").removeClass("show").removeClass("match");
		returnStars();
		makeMove();
		clickCounter();
		timer();
	});
}

/*
Below function calls all relevant functions when a user clicks a card, thus making a move
*/

function makeMove(){
	$(".card").click(function(e){
		showCardSymbol($(e.target));
		addToCardCheck($(e.target));
		if (cardCheck.length === 2) {
			checkMatches();
		}
		congratsMessage();
	});
}

/*
Call functions to make the game work
*/
shuffleCards();
restartGame();
clickCounter();
timer();
makeMove();

