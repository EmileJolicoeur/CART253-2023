class   Timer   {
    constructor(x, y, size, maxMin, maxSec)   {
        //Timer Module's Node variables:
        this.x              =   x;
        this.y              =   y;
        this.size           =   size;
 
        //Arming the bomb:
        this.armed          =   true;
         
        //Timer values:
        this.maxMin         =   maxMin;
        this.maxSec         =   maxSec;
        this.timeSec        =   undefined;
        this.countdownSec   =   undefined;
    }

    /** Setting up the Timer Module's countdown:    */
    countdown() {
        //Setting the increment to Seconds:
        this.countdownSec   =   round(millis()/1000);

        //Generating the Timer's beeping:
        if (this.timeSec != this.maxSec - this.countdownSec && this.armed === true) {
            this.timeSec    =   this.maxSec - this.countdownSec;
            beep();
        }

        //Game Over when the Countdown reaches 0:
        if (this.timeSec <= 0)  {
            gamePhase   =   `lost`;
        }
    }

    /** Displaying the Timer Module:    */
    display()   {
        //Timer Background:
        push();
        noStroke();
        fill(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.size);
        pop();

        //Timer Countdown:
        push();
        textAlign(CENTER);
        textSize(32);
        fill(255, 0, 0);
        text(floor(this.timeSec/60) + ':' + floor((this.timeSec%60)/10) + (this.timeSec%60)%10 , this.x, this.y -25);
        pop();
    
        //TimerMod Image:
        push();
        noStroke();
        imageMode(CENTER);
        image(disTIM, this.x, this.y, this.size, this.size);
        pop();
    }
    
    //Debugging:    Countdown:
    debugging()    {
        console.log(`${i}: tim:\nX = ${timer.x},\nY = ${timer.y},\nZ = ${timer.z}`);
    }
}