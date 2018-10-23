/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-bomb", "fa-ghost", "fa-gamepad", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle"];
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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


const distributeCards = function (self) {
    let newDeck = shuffle(self.reduce(function (res, current, index, array) {
        return res.concat([current, current]);
    }, []));

    let element = $('.deck > li > .fas');
    for (let i = 0; i < newDeck.length; i++) {
        element[i].classList.toggle(newDeck[i]);
    }
}

//Distribuir todas as cartas aleatóriamente.
distributeCards(cards);

const startGame = function () {

    let cardList = $('.card');
    let starList = $('i.fa-star');

    cardList.removeClass('match');
    cardList.removeClass('open');
    cardList.removeClass('show');
    starList.addClass('checked');
    // starList.removeClass('half-checked');
    moves = 0;
    $('.moves').html(`${moves}`)

}

// Reinicia todos os dados
// window.onload = startGame();


function rateStars() {
    let a = $('.stars > li > i');
    if (moves >= 5 && moves < 10) {
        a[3].classList.remove('checked');
    } else if (moves >= 10 && moves < 15) {
        a[2].classList.remove('checked');
    } else if (moves >= 15 && moves < 20) {
        a[1].classList.remove('checked');
    } else if (moves >= 20) {
        a[0].classList.remove('checked');
    }
}


function countMoves () {
    $('.moves').html(`${moves}`);
    moves++;
}

function countMovements() {
    $('.moves').html(`${moves}`);

    $('.card').click(function (e) {
        let target = $(e.target);

        if (target.hasClass('open') === false && target.is('li')) {
            moves++;
            $('.moves').html(`${moves}`)
            target.addClass('open');
            
        }
        rateStars()
    })

}


// Ainda sem definição
function cardMatch() {
    $('.card').click(function (e) {
        let target = $(e.target);
        target.addClass('open');
        
    })
}


$('.restart').click(function (event) {
    startGame();
});

// cardMatch();

countMovements();

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