class   ModuleTIM   {
    //Timer
    constructor(x, y, size, maxMin, maxSec)   {
        //Position of Timer:
        this.size   =   size;

        this.x  =   x;
        this.y  =   y;
        this.z  =   `frontal`;

            //Arming the bomb
        this.armed  =   true;
        
            //Timer values
        this.maxMin =   maxMin;
        this.maxSec =   maxSec;
        this.timeSec    =   undefined;
        this.countdownSec   =   undefined;
    }

    countdown() {
        this.countdownSec   =   round(millis()/1000);
        if (this.timeSec != this.maxSec - this.countdownSec && this.armed === true) {
            this.timeSec    =   this.maxSec - this.countdownSec;
            beep();     //Does this work?
        }

        // if (this.timeSec <= 0)  {
        //     phase   =   `Lose`;
        // }
    }

    display()   {
        //Timer Background
        push();
        noStroke();
        imageMode(CENTER);
        image(disTIM, this.x, this.y, this.size, this.size);
        pop();

        //Timer Countdown
        push();
        textAlign(CENTER);
        textSize(32);
        fill(255, 0, 0);
        text(floor(this.timeSec/60) + ':' + floor((this.timeSec%60)/10) + (this.timeSec%60)%10 , this.x, this.y -25);
        pop();

    }
    
    debugging(i)    {
        console.log(`${i}: tim:\nX = ${timer.x},\nY = ${timer.y},\nZ = ${timer.z}`);

    }
}