
// The below code modified from:
// https://codepen.io/jmikey/pen/tFHrp

class timer {

    constructor(time, timeElement){
        this.time = time;
        this.secondsRemaining = time * 60;
        this.intervalHandle = null;
        this.timeDisplay = timeElement;
        this.isTimerRunning = false;
    }

    // Timer functions
    reset(time){
        this.time = time;
        this.secondsRemaining = time * 60;
        clearInterval(this.intervalHandle);
        this.intervalHandle = null;
        this.isTimerRunning = false;
        $(this.timeDisplay).html('0:00');
        
    }

    // Tic -> changes the timer every second
    tick(){
        // grab the h1
        //var timeDisplay = document.getElementById("time");


        // turn the seconds into mm:ss
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
    
        //add a leading zero (as a string value) if seconds less than 10
        if (sec < 10) {
            sec = "0" + sec;
        }
    
        // concatenate with colon
        var message = min.toString() + ":" + sec;
    
        // now change the display
        this.timeDisplay.html(message);
    
        // stop is down to zero
        if (this.secondsRemaining === 0){
            // show pop-up when time reaches 0
            $('.overlay-lose').addClass('show');
            clearInterval(this.intervalHandle);
                        //resetPage();
        }
    
        //subtract from seconds remaining
        this.secondsRemaining--;
    
    }

    startCountdown(){
    
        // how many seconds
        // secondsRemaining = minutes * 60;
        
        //every second, call the "tick" function
        // have to make it into a variable so that you can stop the interval later!!!
        this.isTimerRunning = true;
        this.intervalHandle = setInterval(() => { this.tick() }, 1000);
    
        // hide the form
        //document.getElementById("inputArea").style.display = "none";
    
    
    }


}
