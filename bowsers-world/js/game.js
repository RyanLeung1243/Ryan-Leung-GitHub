// Bowsers Castle
// by: Ryan Leung 2019
// Credited to Michael Whyte
$('.overlay-sound').addClass('show'); 
let noMusic = false;
class Stats {
    constructor(){

        this.turns = 0;
        this.turnsOutput = $('#turn-output');
        this.matches = 0;
        this.matchesOutput = $('#match-output');
        this.timeOutput = $('#timer');
    }

    // init
    // - reset the turns
    // - reset the matches
    init(){
        this.turns = 0;
        this.matches = 0;
        this.turnsOutput.html('00');
        this.matchesOutput.html('00');

    }

    //output number of turns
    setTurns(){
        this.turns++;
        // if(this.turns < 10){
        //     this.turnsOutput.html(`0${this.turns}`)
        // }else{ this.turnsOutput.html(this.turns);
        // } << can use this or below

        // Ternary operator
        this.turns < 10 ? this.turnsOutput.html(`0${this.turns}`) : this.turnsOutput.html(this.turns);
    }

//output number of matches
setMatches(){
    this.matches++;
    // if(this.turns < 10){
    //     this.turnsOutput.html(`0${this.turns}`)
    // }else{ this.turnsOutput.html(this.turns);
    // } << can use this or below

    // Ternary operator
    this.matches < 12 ? this.matchesOutput.html(`0${this.matches}`) : this.matchesOutput.html(this.matches);
    return this.matches;
}
// get the number of matches


}// end of class stats



// Master Game Class

class Game{
    constructor(){
        // array of game cards
        this.cards = cards;
        //selecet all the cards from HTML elements
        this.elCards = $('.card');
        this.body = $('body');
        // counts for clicks
        this.clickCounter = 1;
        // Set the winning match number
        this.winMatchNumber = 13;
        // this.elCards.length / 2;
        // Flag for determining if the open door animation is running
        this.preventClicks = false;
        // An array for storing all the open cards during
        this.openCards = [];
        this.stats = new Stats();
        this.timer = new timer(2, $('#timer'));
    }

    // Game Methods


    //init
    //-set the game up
    init(){
        // store a reference to 'this' in a variable so that we can use it inside our functions
        this.cards = this._shuffleCards(this.cards);

        // Store a reference to 'this'
        // in a variable...so that we can
        // use it inside our functions
        const that = this;

        //Insert the game cards into the HTML card elements
        this.elCards.each(function(i){

            // set a data-id attribute on each card element
            $(this).data('number', that.cards[i].number);

            //insert a card image to each HTML card element
            $(this).find('.card-image img')

            .attr({
                src: that.cards[i].path,
                alt: that.cards[i].alt
            });
            
        });

        //this.timer.startCountdown();
        // $('.overlay-sound').addClass('show'); 
    }
    

     //reset the game
     reset(){
        // console.log('reset');
        this.elCards.removeClass('open');
        this.stats.init();
        this.init();
        this.timer.reset(2);
    }   

    // showGameBoard
    //- Animates out the opening screen
    //and animates in the gameboard screen
    //via a class to the body
    showGameBoard(){
        this.body.addClass('game-has-started');
    }

// clickCard
// el ->> the card taht was clicked on
// -> fail if card is already open
// -> fail if this.preventClicks = true
clickCard(el){

    //fast fail
    // kill the function if the preventClicks flag is true or the element has a class of 'open'

    if(this.preventClicks == true || el.hasClass('open') ){
        // return will kill the function (Stop here)

        return;
    }
    // If we make it past the fast fail gate about...then we know the click was valid... process it
    

    el.addClass('open');
    // Add the opened card to the openCards array
    this.openCards.push(el);

    if(this.clickCounter == 2){
        this.clickCounter =1;
        this.stats.setTurns();
        
        const matched = this._isMatched(this.openCards[0], this.openCards[1]);
        if(matched.match === true && matched.totalMatches === this.winMatchNumber){
            
            // get a reference to 'this'...
            const that = this;
            //run the end game method after a small delay
            setTimeout(function(){
                that._endGameWin();
            }, 300);
    }
    return;
}
    // Add one to the clickCounter...only if this was the first card revealed
    this.clickCounter++;

}
// Determine if a set of cards matches...
_isMatched(card1, card2){

        this.openCards = []; //<<clears array

        //test if cards match
        if(card1.data('number') == card2.data('number')){
            $('#coin')[0].play();


        //if two death cards match game ends - YOU LOSE
        if(card1.data('number') == 14) {
            $('#coin')[0].pause();
            $('#mario-card')[0].play();
            this._endGameLose();
        }
                
        //updates match counter
        return {
            match: true, totalMatches: this.stats.setMatches()};
        
        }


    // get a reference to 'this
    const that = this;
    // set the preventClicks flag to true.. to prevent quick clicking and revealing of other cards
    this.preventClicks = true;


    //if we make it this far.. then the cards do not match...
    //-remove the 'open' class from the cards
    // - put in a delay so that the user has a chance to look at the cards

    setTimeout(function(){
    card1.removeClass('open');
    card2.removeClass('open');
    
    
    // restore the ability to click by changing the preventClicks flag to false..
    // that.preventClicks = false;

    // add event listener
    card1.one('transitionend', function(){
        $('#wrong')[0].play();
        that.preventClicks = false;

    });

},550);
return {match: false, totalMatches: null};
}

// endgame
// - temp: scroll back to start screen
//  - will add more later!!!
    _endGameWin(){
        // this.body.removeClass('game-has-started');
        $('.overlay-win').addClass('show');
        this.timer.reset();
        $('#main-music')[0].pause();
        $('#win-music')[0].play();
        // $('#music-end-game-win-music')[0].play();
    }

    _endGameLose(){
        $('.overlay-lose').addClass('show');
        $('#main-music')[0].pause();
        $('#game-over')[0].play();
        this.timer.reset();
    }

//utility methods
//Shuffle an array based on stackoverflow Q&A https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

_shuffleCards(a){
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

}


//create game variable here..so that it is available everywhere
let game;
//Start Game Button
const $btnStart = $('#btn-start');
// End Game Button
const $btnEnd = $('#btn-end-game');
// end Game Buttons
const $btnPlayAgainYes = $('.btn-play-again-yes');
const $btnPlayAgainNo = $('.btn-play-again-no');

// //music tracks
// const musicEndGameWin = $('#music-end-game-win-music')[0]

// Game Cards
const $cards = $('.card');

const $btnSoundYes = $('.btn-music-yes');
const $btnSoundNo = $('.btn-music-no');

const $btnRules = $('.btn-rules');
const $btnRulesClose = $('.btn-rules-close');

$btnStart.click(function(){
//create an instance of our Match Game Class

    game = new Game(); //<< this will get all the game functions to work when click

    // Run the showGameBoard Method
    game.showGameBoard();

    //run the init() method
    game.init();
    
    //play game sounds
    if(!noMusic) {
        $('#underground')[0].pause();
        $('#main-music')[0].loop = true;
        $('#main-music')[0].play();
    }
    // if ($btnSoundNO == true){
    //     $('#main-music')[0].pause();

    // }else {
    //     alert('hello');
    // $('#main-music')[0].loop = true;
    // $('#main-music')[0].play();
    // }

    

});

$cards.click(function(){

        game.clickCard( $(this));
        //play card sound
        $('#card-click')[0].play();

        if(game.timer.isTimerRunning === false){
            game.timer.startCountdown();
          
        }
        

});

$btnEnd.click(function(){//<<this is called from top 'endGame'

    game._endGameLose();
    $('#main-music')[0].pause();
    $('#game-over')[0].play();


});
//temp code opend all doors
// $('.card').addClass('open');
//temp go to game screen
// $btnStart.trigger('click');

$btnPlayAgainYes.click(function(){

    //alert('hello');

    //pause the music
    //musicEndGameWin.pause();
    //rewind track
    //musicEndGameWin.currentTime = 0;
    $('.overlay-win').removeClass('show');
    $('.overlay-lose').removeClass('show');
    game.reset();
    $('#main-music')[0].currentTime = 0;
    $('#main-music')[0].play();
    
});

$btnPlayAgainNo.click(function(){

    //alert('hello');

    //pause the music
    //musicEndGameWin.pause();
    //rewind track
    //musicEndGameWin.currentTime = 0;
    $('.overlay-win').removeClass('show');
    $('.overlay-lose').removeClass('show');
    $('.overlay-come').addClass('show');
    

});

$btnSoundYes.click(function(){
    $('#underground')[0].play();
    $('.overlay-sound').removeClass('show');
});

$btnSoundNo.click(function(){
    $('#underground')[0].pause();
    noMusic = true;
    $('.overlay-sound').removeClass('show');
});

$btnRules.click(function(){
    $('.overlay-rules').addClass('show');
});

$btnRulesClose.click(function(){
    $('.overlay-rules').removeClass('show');
})

//temp code to get doors open

// const $card = $('.card');
// $card.click(function(){

//     $(this).toggleClass('open');
// })