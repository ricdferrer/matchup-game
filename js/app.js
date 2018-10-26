/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-broom", "fa-ghost", "fa-gamepad", "fa-hippo", "fa-bolt", "fa-crow", "fa-leaf", "fa-frog"];
let moves = 0;

let comparedCards = [];
let checkMatch = [];

let modal = document.getElementById("popup1");
let closeicon = document.querySelector(".close");
let matchedCard = document.getElementsByClassName("match");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card"s HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * @description Create an array with all.
 **/
const handOutCard = function (foo) {
    foo.reduce(function (res, current, index, array) {
        newCardSet = res.concat([current, current])
        return newCardSet;
    }, []);
    return shuffle(newCardSet);
};

/**
 * @description Distribute all cards created by handOutCard
 * @param {array} cards - Array of cards.
 **/
const distributeCards = function() {
    var allCards = handOutCard(cards);
    let element = $(".deck > li > .fas");
    element.attr('class', 'fas');
    for (let i = 0; i < allCards.length; i++) {
        element[i].classList.toggle(allCards[i]);
    }
}


/**
 * @description Clear all data to start/restart the game
 **/
const startGame = function () {
    let cardList = $(".card");
    let starList = $("i.fa-star");
    distributeCards()
    cardList.removeClass("match");
    cardList.removeClass("open");
    cardList.removeClass("show");
    cardList.removeClass("disabled");
    starList.addClass("checked");
    moves = 0;
    $(".moves").html(`${moves}`);
    second = 0;
    minute = 0;
    hour = 0;
    $(".timer").html("0 mins 0 secs");
    clearInterval(interval);
    
};

// TODO: start the game by opening the page
window.onload = startGame();


/**
 * @description Count movements and start the timer
 **/
function countMoves() {
    moves++;
    $(".moves").html(`${moves}`);
    rateStars();
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    if (moves >= 2) {
        $(".moveText").html(" Moves");
    }
}

// TODO: start timer
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

/**
 * @description Check if cards are equal or different
 **/
function checkCards() {
    comparedCards.push(this);
    checkMatch.push(this.children);
    if (checkMatch.length === 2) {
        let firtPick = checkMatch[0][0].className;
        let secondPick = checkMatch[1][0].className;
        if (firtPick !== secondPick) {
            unmatched();
            firtPick = "";
            secondPick = "";
            checkMatch = [];
        } else {
            matched();
            firtPick = "";
            secondPick = "";

            checkMatch = [];
        }
    }
}

// TODO: flip cards
const displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/**
 * @description Apply attribute on matched cards
 **/
function matched() {
    comparedCards[0].classList.add("match", "disabled");
    comparedCards[1].classList.add("match", "disabled");
    comparedCards[0].classList.remove("show", "open");
    comparedCards[1].classList.remove("show", "open");
    comparedCards = [];
    countMoves()
}

/**
 * @description Apply attribute on unmatched cards
 **/
function unmatched() {
    comparedCards[0].classList.add("unmatched");
    comparedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        comparedCards[0].classList.remove("show", "open", "unmatched");
        comparedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        comparedCards = [];
    }, 1100);
    countMoves();
}

/**
 * @description Disables interaction with cards after picking two cards
 **/
function disable() {
    $(".card").addClass("disabled");
}

/**
 * @description Enable interaction again
 **/
function enable() {
    let allCards = $(".card");
    let allMatched = $(".match");
    for (let i = 0; i < allCards.length; i++) {
        if ($.inArray("match", allCards[i].classList) === -1) {
            allCards.removeClass("disabled");
            allMatched.addClass("disabled");
        }
    }
}

/**
 * @description Rate stars function
 **/
function rateStars() {
    let a = $(".stars > li > i");
    if (moves >= 13 && moves < 15) {
        a[3].classList.remove("checked");
    } else if (moves >= 15 && moves < 20) {
        a[2].classList.remove("checked");
    } else if (moves >= 20 && moves < 25) {
        a[1].classList.remove("checked");
    } else if (moves >= 25) {
        a[0].classList.remove("checked");
    }
}

/**
 * @description Call congratulations modal
 **/
function congratulations() {
    if (matchedCard.length === 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = $("ul.stars > li > i.checked");

        //showing move, rating, time on modal
        $("#finalMove").html(`${moves}`);
        for (let i = 0; i < starRating.length; i++) {
            $("#starRating").append(starRating);
        }
        $("#totalTime").html(`${finalTime}`);

        //closeicon on modal
        closeModal();
    }
}

/**
 * @description close button on modal screen
 **/
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}

/**
 * @description user play again button
 **/
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


/**
 * @description add listener on cards
 **/
function setCardsListener() {
    let cardDeck = $(".card")
    for (let i = 0; i < cardDeck.length; i++) {
        cardDeck[i].addEventListener("click", displayCard);
        cardDeck[i].addEventListener("click", checkCards);
        cardDeck[i].addEventListener("click", congratulations);
    }
}

// TODO: setting all listeners
setCardsListener();


// TODO: restart game button
$(".restart").click(function (event) {
    startGame();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card"s symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card"s symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */